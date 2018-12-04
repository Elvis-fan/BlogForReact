import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation'
import { getPostData } from '@util/post-util'
import { mongodbResult } from '@filter/mongodb.result'

import { db } from '@util/mongodb'
import { SignInterceptor } from '@filter/sign'
@(Route({ path: 'article' }) as any)
export class Article {
  @(Autowired(() => db.collection('articles')) as any)
  collection
  @(Autowired(() => db.collection('classes')) as any)
  classesCollection
  @Route({ path: 'articles/:type/:page/:size', type: TYPE.GET })
  async getArticles({ params }) {
    const { type, page, size } = params
    if (type === 'new') {
      return await this.collection
        .find({},
          {
            sort: { date: -1 },
            limit: 15,
            projection: { _id: 0, content: 0, images: 0 },
          })
        .toArray()
    }
    const classes = await this.classesCollection
      .find({ pid: type }, { projection: { id: 1, _id: 0 } }).map((v) => v.id).toArray()
    classes.push(type)
    return await this.collection
      .find({ class: { $in: classes } },
        {
          skip: page * size, limit: Number(size),
          projection: { _id: 0, content: 0, images: 0 },
        })
      .toArray()
  }

  @Route({ path: 'articles/new', type: TYPE.GET })
  async newArticles() {

    return await this.collection
      .find({},
        {
          sort: { date: -1 },
          limit: 15,
          projection: { _id: 0, content: 0, images: 0 },
        })
      .toArray()
  }

  @Route({ path: 'topArticles/:type', type: TYPE.GET })
  async getTopArticles({ params }) {
    const { type } = params
    const classes = await this.classesCollection
      .find({ pid: type }, { projection: { id: 1, _id: 0 } }).map((v) => v.id).toArray()
    classes.push(type)
    return await this.collection
      .find({
        class: { $in: classes },
      },
        { limit: 5, sort: { date: -1 }, projection: { _id: 0, content: 0, cover: 0, images: 0, class: 0 } })
      .toArray()
  }

  @Route({ path: 'article/:id', type: TYPE.GET })
  async getArticle({ params }) {
    const { id } = params
    return await this.collection.find({ id }, { projection: { _id: 0 } }).next()
  }

  @Route({ path: 'article', type: TYPE.POST, Interceptors: [SignInterceptor] })
  async postArticle(ctx: any) {
    const article: any = await getPostData(ctx)
    if (article.id) {
      const data = await this.collection.update({ id: article.id }, article)
      return mongodbResult(data)
    }
    return {}
  }

  @Route({ path: 'test', type: TYPE.POST })
  async test(ctx) {
    // const {fields,files}: any = await multipartyPromise(ctx, {uploadDir: './assets/image/'});
    // let inputFile = files.image[0];
    // let uploadedPath = inputFile.path;
    // let dstPath = './assets/image/' + inputFile.originalFilename;
    // //重命名为真实文件名
    // fs.renameSync(uploadedPath, dstPath);
    ctx.body = { data: { link: 'http://106.14.150.87/static/image/1.jpg' } }
  }

  @Route({ path: 'update', type: TYPE.POST })
  async update(ctx) {
    const article: any = await getPostData(ctx)
    let briefing = article.content.replace(/<(?:.|\s)*?>/g, '')
    if (briefing.length > 100) {
      briefing = briefing.substring(0, 100)
    }
    // const sql: string = article.id ?
    //     `UPDATE article SET title=${article.title},type=${article.type},date=${new Date(article.date)},briefing=${briefing},content=${article.content} WHERE id=${article.id}` :
    //     `INSERT INTO article (title,type,date,briefing,content) VALUES (${article.title},${article.type},${new Date(article.date)},${briefing},${article.content})`;
    // const result = await pool.query(sql);
    ctx.body = {}
  }
}
