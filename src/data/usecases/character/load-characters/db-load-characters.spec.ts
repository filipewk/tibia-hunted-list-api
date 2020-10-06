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
})
