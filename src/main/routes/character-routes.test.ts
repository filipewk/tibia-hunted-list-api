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

    test('Should return 204 when there is no character to load', async () => {
      await request(app)
        .get('/api/characters')
        .expect(204)
    })
  })

  describe('PUT /character/:characterId', () => {
    test('Should return 204 when successfully update character ', async () => {
      const character = await makeCreateCharacter('Character Teste1')
      await request(app)
        .put(`/api/character/${character.id}`)
        .send({
          character: 'Filipe',
          priority: 5
        })
        .expect(204)
    })
  })

  describe('DELETE /character/:characterId', () => {
    test('Should return 204 when successfully deleting character ', async () => {
      const character = await makeCreateCharacter('Character Teste1')
      await request(app)
        .delete(`/api/character/${character.id}`)
        .expect(204)
    })
  })
})
