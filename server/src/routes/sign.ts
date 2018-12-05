import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation'

import { getPostData } from '@util/post-util'
import { User } from '@dto/user'
import { db } from '@util/mongodb'
import { encode } from '@util/jwt'
@(Route({ path: 'sign' }) as any)
export class Sign {
  @(Autowired(() => db.collection('user')) as any)
  collection
  @Route({ path: 'in', type: TYPE.POST })
  async in(ctx) {
    const { name, password } = await getPostData(ctx) as User
    const data = await this.collection.countDocuments({ name, password })
    let token = ''
    if (data > 0) {
      token = encode(name)
    }
    return { status: data, token }
  }
}
