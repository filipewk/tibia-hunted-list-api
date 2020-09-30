import { CharacterPostgresRepository } from './character-postgres-repository'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import Character from '../models/character'
import env from '@/main/config/env'
import { mockAddCharacterParams } from '@/domain/test/mocks/character'

const makeSut = (): CharacterPostgresRepository => {
  return new CharacterPostgresRepository()
}

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    sequelizeHelper.connect(env.postgresUrl)
  })

  afterAll(async () => {
    await sequelizeHelper.disconnect()
  })

  beforeEach(async () => {
    await Character.destroy({ truncate: true })
  })

  describe('add()', () => {
    test('Should add character on success', async () => {
      const sut = makeSut()
      await sut.add({
        name: 'On Rails',
        sex: 'male',
        vocation: 'Elite Knight',
        level: 50,
        world: 'Duna',
        residence: 'Edron',
        priority: 1,
        status: 'Premium Account'
      })
      const character = await Character.findOne({ where: { name: 'On Rails' } })
      expect(character).toBeTruthy()
    })
  })

  describe('loadByName()', () => {
    test('Should return a character on success', async () => {
      const sut = makeSut()
      const addCharacterParams = mockAddCharacterParams()
      await sut.add(addCharacterParams)
      const dbCharacter = await sut.loadByName(addCharacterParams.name)
      expect(dbCharacter).toBeTruthy()
      expect(dbCharacter.id).toBeTruthy()
      expect(dbCharacter.name).toBe(addCharacterParams.name)
      expect(dbCharacter.level).toBe(addCharacterParams.level)
      expect(dbCharacter.priority).toBe(addCharacterParams.priority)
      expect(dbCharacter.residence).toBe(addCharacterParams.residence)
      expect(dbCharacter.sex).toBe(addCharacterParams.sex)
      expect(dbCharacter.status).toBe(addCharacterParams.status)
      expect(dbCharacter.vocation).toBe(addCharacterParams.vocation)
      expect(dbCharacter.world).toBe(addCharacterParams.world)
    })
  })
})
