import { Model, DataTypes } from 'sequelize'

export default class Article extends Model {
  static mapper = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    briefing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }
  public id!: number
  public category!: string
  public title!: string
  public author!: string
  public date!: number
  public briefing: string
  public content!: string
  public status: number
}
