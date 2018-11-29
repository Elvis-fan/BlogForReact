import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation';
import { db } from '../util/mongodb';
@(Route({ path: 'classes' }) as any)
export class Classes {
    @(Autowired(() => db.collection('classes')) as any)
    collection;

    @Route({ path: 'getClasses/:pid/:child', type: TYPE.GET, })
    async getClasses({ params }) {
        const { pid, child } = params
        if(Number(child)){
            console.log(123)
        }
        return await this.collection.find({ pid }, { projection: { _id: 0 } }).toArray()
    }
}