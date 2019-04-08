import { Sequelize, DataTypes } from 'sequelize'
import User from './user'
import Category from './category'
import Article from './article'
let sequelize
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
    })
} else {
    sequelize = new Sequelize({
        host: 'localhost',
        port: 5432,
        database: 'blog',
        username: 'postgres',
        password: 'postgres',
        dialect: 'postgres',
    })
}
User.init(User.mapper, {
    timestamps: false,
    tableName: 'user',
    sequelize, // this bit is important
},
)
User.beforeCreate(async (user: User) => {
    user.password = await user.generatePasswordHash()
})
Category.init(Category.mapper, {
    timestamps: false,
    tableName: 'category',
    sequelize, // this bit is important
},
)
Article.init(Article.mapper, {
    timestamps: false,
    tableName: 'article',
    sequelize, // this bit is important
},
)
export { sequelize }
const models = {
    User,
    Category,
    Article,
}

export default models
