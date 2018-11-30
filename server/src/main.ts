
// /**
//  * Created by MR-Liu on 2018/3/3.
//  */
// declare const require: any

import { mongodbPool } from '@util/mongodb'
import app from 'koa2_autowired_route'

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response

const start = () => {
  app.listen(3333)
}
mongodbPool(start)
