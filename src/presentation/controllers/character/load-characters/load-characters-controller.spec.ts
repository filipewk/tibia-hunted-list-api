import { LoadCharacters } from '@/domain/usecases/character/load-characters'
import { mockLoadCharacters } from '@/presentation/test/mocks/character'
import { LoadCharactersController } from './load-characters-controller'

type SutTypes = {
  sut: LoadCharactersController
  loadCharactersStub: LoadCharacters
}

const makeSut = (): SutTypes => {
  const loadCharactersStub = mockLoadCharacters()
  const sut = new LoadCharactersController(loadCharactersStub)
  return {
    sut,
    loadCharactersStub
  }
}

// TODO 200 204 throw 500

describe('LoadCharacters Controller', () => {
  test('Should call LoadCharacters', async () => {
    const { sut, loadCharactersStub } = makeSut()
    const loadSpy = jest.spyOn(loadCharactersStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
