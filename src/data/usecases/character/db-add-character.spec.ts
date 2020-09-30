import { DbAddCharacter } from './db-add-character'
import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { LoadCharacterByNameRepositorySpy, mockAddCharacterRepository } from '@/data/test/mocks/db-character'
import { mockAddCharacterParams, mockCharacterModel } from '@/domain/test/mocks/character'

type SutTypes = {
  sut: DbAddCharacter
  addCharacterRepositoryStub: AddCharacterRepository
  loadCharacterByNameRepositorySpy: LoadCharacterByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCharacterRepositoryStub = mockAddCharacterRepository()
  const loadCharacterByNameRepositorySpy = new LoadCharacterByNameRepositorySpy()
  loadCharacterByNameRepositorySpy.characterModel = null
  const sut = new DbAddCharacter(addCharacterRepositoryStub, loadCharacterByNameRepositorySpy)
  return {
    sut,
    addCharacterRepositoryStub,
    loadCharacterByNameRepositorySpy
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

  test('Should return null if LoadCharacterByNameRepository not returns null', async () => {
    const { sut, loadCharacterByNameRepositorySpy } = makeSut()
    loadCharacterByNameRepositorySpy.characterModel = mockCharacterModel()
    const addCharacterParams = mockAddCharacterParams()
    const character = await sut.add(addCharacterParams)
    expect(character).toBeNull()
  })

  test('Should call LoadCharacterByNameRepository with correct name', async () => {
    const { sut, loadCharacterByNameRepositorySpy } = makeSut()
    const addCharacterParams = mockAddCharacterParams()
    await sut.add(addCharacterParams)
    expect(loadCharacterByNameRepositorySpy.character).toBe(addCharacterParams.name)
  })
})
