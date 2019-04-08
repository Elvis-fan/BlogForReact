import { Model, DataTypes } from 'sequelize'
import * as bcrypt from 'bcrypt'

class User extends Model {
    static mapper = {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }

    public static findBySignIn = async (signIn) => {
        let user = await User.findOne({
            where: {id: signIn},
        })
        if (!user) {
            user = await User.findOne({
                where: {name: signIn},
            })
        }
        return user
    }
    public id!: number
    public name!: string
    public password!: string
    public generatePasswordHash = async () => {
        const saltRounds = 10
        return await bcrypt.hash(this.password, saltRounds)
    }
    public validatePassword = async (password: string) => {
        const saltRounds = 10
        return await bcrypt.compare(password, this.password)
    }
}
// User.beforeCreate(async (user: User) => {
//     user.password = await user.generatePasswordHash()
//   })
export default User
