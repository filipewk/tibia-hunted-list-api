import Sequelize, { Model, Optional } from 'sequelize'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import env from '@/main/config/env'
import { CharacterModel } from '@/domain/models/character'

interface CharacterCreationAttributes extends Optional<CharacterModel, 'id'> { }

class Character extends Model<CharacterModel, CharacterCreationAttributes> implements CharacterModel {
  public id!: string
  public name!: string
  public sex!: string
  public vocation!: string
  public level!: number
  public world!: string
  public residence!: string
  public priority?: number
  public status!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Character.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sex: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vocation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    world: {
      type: Sequelize.STRING,
      allowNull: false
    },
    residence: {
      type: Sequelize.STRING,
      allowNull: false
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },

  {
    modelName: 'characters',
    freezeTableName: true,
    tableName: 'characters',
    sequelize: sequelizeHelper.connect(env.postgresUrl)
  }
)

export default Character
