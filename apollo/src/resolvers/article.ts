import {isAuthenticated} from './authorization'
import { combineResolvers } from 'graphql-resolvers'
export default {
  Query: {
    articles: async (parent, {category, page, size }, { models, secret }) => {
      return await models.Article.findAll({
        where: {
          category,
        },
        offset: page * size,
        limit: size,
      })
    },
  },
  Mutation: {
    putArticle: combineResolvers(
      isAuthenticated,
      async (parent, {category, title, content }, { models, secret, user }) => {
        console.log(user)
        const briefing = content.replace(/(\[(.*?)\]\()(.+?)(\))/g, '')
        const article = await models.Article.create({
          category,
          title,
          content,
          briefing,
          author: user.name,
          date: Date.now(),
        })
        return article
      },
    ) ,
  },
}
