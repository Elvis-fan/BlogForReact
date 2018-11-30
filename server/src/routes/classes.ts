import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation'
import { db } from '@util/mongodb'
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
}
