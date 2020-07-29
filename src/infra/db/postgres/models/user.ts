import Sequelize, { Model, Optional } from 'sequelize'
import { SequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { AccountModel } from '@/domain/models/account'

interface UserCreationAttributes extends Optional<AccountModel, 'id'> {}

class User extends Model<AccountModel, UserCreationAttributes> implements AccountModel {
  public id!: string
  public name!: string
  public email!: string
  public password!: string
  public role?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    modelName: 'users',
    freezeTableName: true,
    tableName: 'users',
    sequelize: SequelizeHelper.connect()
  }
)

export default User
