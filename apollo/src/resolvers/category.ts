export default {
  Query: {
    categorys: async (parent, { pid }, { models, secret }) => {
      return await models.Category.findAll({
        where: {pid},
      })
    },
  },
}
