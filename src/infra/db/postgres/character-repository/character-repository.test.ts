import { CharacterPostgresRepository } from './character-repository'
import Character from '../models/character'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { makeCreateCharacter, mockAddCharacterParams } from '@/domain/test/mocks/character'
import env from '@/main/config/env'

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
      const characterParams = mockAddCharacterParams()
      await sut.add(characterParams)
      const character = await Character.findOne({ where: { name: characterParams.name } })
      expect(character).toBeTruthy()
    })
  })

  describe('loadByName()', () => {
    test('Should return a character on success', async () => {
      const sut = makeSut()
      const characterParams = mockAddCharacterParams()
      await sut.add(characterParams)
      const character = await sut.loadByName(characterParams.name)
      expect(character).toBeTruthy()
      expect(character.id).toBeTruthy()
      expect(character.name).toBe(characterParams.name)
      expect(character.level).toBe(characterParams.level)
      expect(character.priority).toBe(characterParams.priority)
      expect(character.residence).toBe(characterParams.residence)
      expect(character.sex).toBe(characterParams.sex)
      expect(character.status).toBe(characterParams.status)
      expect(character.vocation).toBe(characterParams.vocation)
      expect(character.world).toBe(characterParams.world)
    })

    test('Should return null with LoadByName fails', async () => {
      const sut = makeSut()
      const character = await sut.loadByName('wrong_name')
      expect(character).toBeFalsy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all characters on success', async () => {
      const sut = makeSut()
      await makeCreateCharacter('Teste1')
      await makeCreateCharacter('Teste2')
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
      await makeCreateCharacter('Teste1')
      let character = await Character.findOne({ where: { name: 'Teste1' } })
      await sut.deleteById(character.id)
      character = await Character.findOne({ where: { name: 'Teste1' } })
      expect(character).toBeFalsy()
    })

    test('Should deleteById return true on success', async () => {
      const sut = makeSut()
      await makeCreateCharacter('Teste1')
      const character = await Character.findOne({ where: { name: 'Teste1' } })
      const isValid = await sut.deleteById(character.id)
      expect(isValid).toBe(true)
    })
  })
})
