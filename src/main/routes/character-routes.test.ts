import app from '@/main/config/app'
import env from '@/main/config/env'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import request from 'supertest'
import Character from '@/infra/db/postgres/models/character'
import { makeCreateCharacter } from '@/domain/test/mocks/character'

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
          character: 'On Rails',
          priority: 1
        })
        .expect(204)
    })
  })

  describe('GET /characters', () => {
    test('Should return 200 when have a character-list ', async () => {
      await makeCreateCharacter('Character Teste1')
      await makeCreateCharacter('Character Teste2')
      await request(app)
        .get('/api/characters')
        .expect(200)
    })
  })
})

// TODO test route DELETE and GET
