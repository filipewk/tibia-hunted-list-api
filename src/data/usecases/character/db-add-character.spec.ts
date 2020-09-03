import { DbAddCharacter } from './db-add-character'
import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { mockAddCharacterRepository } from '@/data/test/mocks/db-character'
import { mockAddCharacterParams } from '@/domain/test/mocks/character'

type SutTypes = {
  sut: DbAddCharacter
  addCharacterRepositoryStub: AddCharacterRepository
}

const makeSut = (): SutTypes => {
  const addCharacterRepositoryStub = mockAddCharacterRepository()
  const sut = new DbAddCharacter(addCharacterRepositoryStub)
  return {
    sut,
    addCharacterRepositoryStub
  }
}

describe('DbAddCharacter UseCase', () => {
  test('should call DbAddCharacter with correct values', async () => {
    const { sut, addCharacterRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCharacterRepositoryStub, 'add')
    const characterParams = mockAddCharacterParams()
    await sut.add(characterParams)
    expect(addSpy).toHaveBeenCalledWith(characterParams)
  })

  test('Should throw if DbAddCharacter throws', async () => {
    const { sut, addCharacterRepositoryStub } = makeSut()
    jest.spyOn(addCharacterRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const characterParams = mockAddCharacterParams()
    const promise = sut.add(characterParams)
    await expect(promise).rejects.toThrow()
  })
})
