import { Route, TYPE, Autowired } from 'koa2_autowired_route/core/annotation'

import { getPostData } from '@util/post-util'
import { User } from '@dto/user'
import { db } from '@util/mongodb'
import { encode } from '@util/jwt'
@(Route({ path: 'cs' }) as any)
export class Cs {

  @Route({ path: 'order/list', type: TYPE.GET })
  async in(ctx) {
    const data = [
      {
        create_time: '2019/01/01',
        order_sn: '123123121',
        total_price: 12.1,
        integral_money: 1,
        coupon_fee: 31,
        pay_fee: 1,
        pay_type: '送货',
        pay_order_sn: '134564a',
        dispatch_style: '送货',
        address: '上海市',
        prepare_user: 'xeon',
        status: '完成',
        nick_name: 'eick',
        number: '18939502821',
      },
    ]
    return {list: data, count: 100}
  }
}
