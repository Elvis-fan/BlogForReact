import { AuthenticationError, UserInputError } from 'apollo-server'
import User from '@/models/user'
import * as jwt from 'jsonwebtoken'
import { Gql } from './../tools/graphql-decorator'
import Resolver from './resolver'

const createToken = async (user, secret, expiresIn) => {
  const { id, name } = user
  return await jwt.sign({ id, name }, secret, {
    expiresIn,
  })
}

export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      const data = await models.User.findByPk(id)
      return data
    },
  },
  Mutation: {
    signUp: async (parent, { id, name, password }, { models, secret }) => {
      const user = await models.User.create({
        id, name, password,
      })
      return { token: createToken(user, secret, '30m') }
    },
    signIn: async (parent, { signIn, password }, { models, secret }) => {
      const user: User = await models.User.findBySignIn(signIn)
      if (!user) {
        throw new UserInputError('找不到这个用户')
      }
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new AuthenticationError('密码错误')
      }
      return { token: createToken(user, secret, '30m') }
    },
  },
}
