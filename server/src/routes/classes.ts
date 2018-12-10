import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation'
import { db, getNextId } from '@util/mongodb'
import { Classes as ClassesModel } from '@models/classes'
import { getPostData } from '@util/post-util'
import { SignInterceptor } from '@filter/sign'
@(Route({ path: 'classes' }) as any)
export class Classes {
  @(Autowired(() => db.collection('classes')) as any)
  collection
  @Route({ path: 'getClasses/:pid/:child', type: TYPE.GET })
  async getClasses({ params }) {
    const { pid, child } = params
    const parents = await this.collection.find({ pid }, { projection: { _id: 0 } }).toArray()
    if (Number(child)) {
      for (let parent of parents) {
        parent.children = await this.collection.find({ pid: parent.id }, { projection: { _id: 0 } }).toArray()
      }
    }
    return parents
  }
  @Route({ path: 'class', type: TYPE.POST, Interceptors: [SignInterceptor] })
  async update(ctx: any) {
    const classes: ClassesModel = await getPostData<ClassesModel>(ctx)
    if (!classes.id) {
      classes.id = await getNextId('classId')
    }
    const { result } = await this.collection.updateOne({ id: classes.id }, {
      $set: { ...classes },
    }, {
        upsert: true,
      })
    if (result.ok === 1) {
      const data = await this.collection.findOne({ id: classes.id }, { projection: { _id: 0 } })
      return { classe: data, status: 1 }
    }
    return { status: 0 }
  }
  @Route({ path: 'class', type: TYPE.DELETE, Interceptors: [SignInterceptor] })
  async delete(ctx: any) {
    const classe: ClassesModel = await getPostData<ClassesModel>(ctx)
    const { result } = await this.collection.deleteOne({ id: classe.id })
    if (result.ok === 1) {
      return { classe, status: 1 }
    }
    return { status: 0 }
  }
}
