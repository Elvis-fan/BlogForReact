import { checkToken } from './../util/jwt'
import { Interceptor } from 'koa2_autowired_route/core/annotation'
export class SignInterceptor implements Interceptor {
  intercept(ctx, next): boolean {
    const token = ctx.headers.token
    if (checkToken(token)) {
      return true
    } else {
      ctx.throw(400, 'sign in error')
      return false
    }
  }
}
