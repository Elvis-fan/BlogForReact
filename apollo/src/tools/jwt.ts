/**
 * Created by MR-Liu on 2018/3/4.
 */
import * as jwt from 'jwt-simple'
const secret = 'xdcftyv790./。gbhnji3oe、uqw，euqsada'
export const encode = (userName) => {
  return jwt.encode({ name: userName, time: new Date().getTime() }, secret)
}
export const decode = (token) => {
  return jwt.decode(token, secret)
}
export const checkToken = (token) => {
  if (!token) { return false }
  try {
    const info = decode(token)
    const nowTime = new Date().getTime()
    if (nowTime - info.time > 1296000000) {
      return false
    }
    return true
  } catch (e) {
    return false
  }

}
