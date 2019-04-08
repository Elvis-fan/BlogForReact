import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'
export const isAuthenticated = (parent, args, { user }) => {
  return user ? skip : new ForbiddenError('当前为未登录状态，请登录！')
}
