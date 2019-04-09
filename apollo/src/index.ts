import { ApolloServer, gql } from 'apollo-server'
import resolvers from './resolvers'
import schema from './schema'
import * as DataLoader from 'dataloader'
import loaders from './loaders'
import models from './models'
import * as jwt from 'jsonwebtoken'

// 获取用户
const getMe = async (req) => {
  const token = req.headers.token
  if (token) {

    try {
      return await jwt.verify(token, 'process.env.SECRET')
    } catch (e) {
      throw new Error('会话过期，请重新登陆！')
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
  resolvers,
  context: async ({ req }) => {
    const user = await getMe(req)
    return {
      user,
      models,
      secret: 'process.env.SECRET',
      loaders: {
        user: new DataLoader((key) => loaders.user.fetchUser(key, models)),
      },
    }
  },
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
