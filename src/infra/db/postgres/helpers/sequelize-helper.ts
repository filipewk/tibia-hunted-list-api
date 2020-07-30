import { Sequelize } from 'sequelize'

export const sequelizeHelper = {
  client: null as Sequelize,

  connect (uri: string) {
    this.client = new Sequelize(uri)
    return this.client
  },

  async disconnect () {
    await this.client.close()
  }
}
