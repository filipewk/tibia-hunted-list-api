import { CharacterPostgresRepository } from './character-repository'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { mockAddCharacterParams, mockCharacterModel } from '@/domain/test/mocks/character'
import Character from '../models/character'
import env from '@/main/config/env'

const character = mockCharacterModel()

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

    test('Should return null with LoadByName fails', async () => {
      const sut = makeSut()
      const dbCharacter = await sut.loadByName(character.name)
      expect(dbCharacter).toBeFalsy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all characters on success', async () => {
      const sut = makeSut()
      await Character.create({
        name: 'Teste1',
        sex: 'male',
        vocation: 'Elite Knight',
        level: 50,
        world: 'Duna',
        residence: 'Edron',
        priority: 1,
        status: 'Premium Account'
      })
      await Character.create({
        name: 'Teste2',
        sex: 'male',
        vocation: 'Elite Knight',
        level: 50,
        world: 'Duna',
        residence: 'Edron',
        priority: 1,
        status: 'Premium Account'
      })
      const characters = await sut.loadAll()
      expect(characters.length).toBe(2)
      expect(characters[0].id).toBeTruthy()
      expect(characters[1].id).toBeTruthy()
      expect(characters[0].name).toBe('Teste1')
      expect(characters[1].name).toBe('Teste2')
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const characters = await sut.loadAll()
      expect(characters.length).toBe(0)
    })
  })

  describe('deleteById()', () => {
    test('Should delete character by id', async () => {
      const sut = makeSut()
      await Character.create({
        name: 'Teste1',
        sex: 'male',
        vocation: 'Elite Knight',
        level: 50,
        world: 'Duna',
        residence: 'Edron',
        priority: 1,
        status: 'Premium Account'
      })
      let character = await Character.findOne({ where: { name: 'Teste1' } })
      await sut.deleteById(character.id)
      character = await Character.findOne({ where: { name: 'Teste1' } })
      expect(character).toBeFalsy()
    })
  })
})
