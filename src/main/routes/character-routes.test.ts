import app from '@/main/config/app'
import env from '@/main/config/env'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import request from 'supertest'
import Character from '@/infra/db/postgres/models/character'

describe('Character Routes', () => {
  beforeAll(() => {
    sequelizeHelper.connect(env.postgresUrl)
  })

  afterAll(async () => {
    await sequelizeHelper.disconnect()
  })

  beforeEach(async () => {
    await Character.destroy({ truncate: true })
  })

  describe('POST /characters', () => {
    test('Should return 204 on add character ', async () => {
      await request(app)
        .post('/api/characters')
        .send({
          name: 'On Rails',
          sex: 'male',
          vocation: 'Elite Knight',
          level: 50,
          world: 'Duna',
          residence: 'Edron',
          priority: 1,
          status: 'Premium Account'
        })
        .expect(204)
    })
  })
})
