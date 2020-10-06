import { LoadCharactersRepositorySpy } from '@/data/test/mocks/db-character'
import { DbLoadCharacters } from './db-load-characters'

type SutTypes = {
  loadCharactersRepositoryStub: LoadCharactersRepositorySpy
  sut: DbLoadCharacters
}

const makeSut = (): SutTypes => {
  const loadCharactersRepositoryStub = new LoadCharactersRepositorySpy()
  const sut = new DbLoadCharacters(loadCharactersRepositoryStub)
  return {
    sut,
    loadCharactersRepositoryStub
  }
}

describe('DbLoadCharacters Usecase', () => {
  test('Should call LoadCharactersRepository', async () => {
    const { sut, loadCharactersRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCharactersRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return a character-list on success', async () => {
    const { sut, loadCharactersRepositoryStub } = makeSut()
    const characters = await sut.load()
    expect(characters).toBe(loadCharactersRepositoryStub.characterModel)
  })

  test('Should throw if LoadCharactersRepository throws', async () => {
    const { sut, loadCharactersRepositoryStub } = makeSut()
    jest.spyOn(loadCharactersRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
