import { Model, DataTypes } from 'sequelize'

export default class Category extends Model {
  static mapper = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  label: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  }
  public id!: number
  public pid!: number
  public label!: string
}
