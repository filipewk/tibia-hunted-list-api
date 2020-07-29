import { Sequelize } from 'sequelize'

export const SequelizeHelper = {
  client: null as Sequelize,

  connect () {
    this.client = new Sequelize('postgres', 'postgres', 'filipe50', {
      host: '172.25.0.2',
      dialect: 'postgres',
      timezone: '-03:00'
    })
    return this.client
  },

  disconnect () {
    this.client.close()
  }
}
