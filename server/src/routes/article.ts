import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation'
import { getPostData } from '@util/post-util'
import { mongodbResult } from '@filter/mongodb.result'
import { Article as ArticleModel } from '@models/article'
import { db } from '@util/mongodb'
import { SignInterceptor } from '@filter/sign'
import * as moment from 'moment'

const FORMAT = 'YYYY-MM-DD HH:mm'
@(Route({ path: 'article' }) as any)
export class Article {
  @(Autowired(() => db) as any)
  db
  @(Autowired(() => db.collection('articles')) as any)
  collection
  @(Autowired(() => db.collection('classes')) as any)
  classesCollection
  @Route({ path: 'articles/:type/:page/:size', type: TYPE.GET })
  async getArticles({ params }) {
    const { type, page, size } = params
    let list: ArticleModel[]
    if (type === 'new') {
      list = await this.collection
        .find({},
          {
            sort: { date: -1 },
            limit: 15,
            projection: { _id: 0, content: 0, images: 0 },
          })
        .toArray()
    } else {
      const classes = await this.classesCollection
        .find({ pid: type }, { projection: { id: 1, _id: 0 } }).map((v) => v.id).toArray()
      classes.push(type)
      list = await this.collection
        .find({ class: { $in: classes } },
          {
            skip: page * size, limit: Number(size),
            projection: { _id: 0, content: 0, images: 0 },
          })
        .toArray()
    }
    list.forEach((article) => article.date = moment(article.date).format(FORMAT))
    return list
  }

  @Route({ path: 'articles/new', type: TYPE.GET })
  async newArticles() {

    const list: ArticleModel[] = await this.collection
      .find({},
        {
          sort: { date: -1 },
          limit: 15,
          projection: { _id: 0, content: 0, images: 0 },
        })
      .toArray()
    list.forEach((article) => article.date = moment(article.date).format(FORMAT))
    return list
  }

  @Route({ path: 'topArticles/:type', type: TYPE.GET })
  async getTopArticles({ params }) {
    const { type } = params
    const classes = await this.classesCollection
      .find({ pid: type }, { projection: { id: 1, _id: 0 } }).map((v) => v.id).toArray()
    classes.push(type)
    const list: ArticleModel[] = await this.collection
      .find({
        class: { $in: classes },
      },
        { limit: 5, sort: { date: -1 }, projection: { _id: 0, content: 0, cover: 0, images: 0, class: 0 } })
      .toArray()
    list.forEach((article) => article.date = moment(article.date).format(FORMAT))
    return list
  }

  @Route({ path: 'article/:id', type: TYPE.GET })
  async getArticle({ params }) {
    const { id } = params
    const article = await this.collection.findOne({ id }, { projection: { _id: 0 } })
    article.date = moment(article.date).format('YYYY-MM-DD HH:mm')
    return article
  }

  @Route({ path: 'article', type: TYPE.POST, Interceptors: [SignInterceptor] })
  async postArticle(ctx: any) {
    const article: ArticleModel = await getPostData<ArticleModel>(ctx)
    let briefing = article.content.replace(/<(?:.|\s)*?>/g, '')
    if (briefing.length > 100) {
      briefing = briefing.substring(0, 100)
    }
    const date = new Date()
    const status = 0

    Object.assign(article, { briefing, date, status })

    const { db } = this
    const getNextSequenceValue = async (sequenceName) => {
      let { value } = await db.collection('counters')
        .findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } })
      return `${value.sequence_value}`
    }
    if (!article.id) {
      article.id = await getNextSequenceValue('articleId')
    }
    const { result } = await this.collection.updateOne({ id: article.id }, {
      $set: { ...article },
    }, {
        upsert: true,
      })
    if (result.ok === 1) {
      const data = await this.collection.findOne({ id: article.id }, { projection: { _id: 0 } })
      data.date = moment(article.date).format('YYYY-MM-DD HH:mm')
      return { article: data, status: 1 }
    }
    return { status: 0 }
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

  @Route({ path: 'status', type: TYPE.POST })
  async changeStatus(ctx) {
    const article: ArticleModel = await getPostData<ArticleModel>(ctx)
    return await this.collection
      .findOneAndUpdate({ id: article.id }, { ...article })
  }

  @Route({ path: 'update', type: TYPE.POST })
  async update(ctx) {
    const article: ArticleModel = await getPostData<ArticleModel>(ctx)
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
