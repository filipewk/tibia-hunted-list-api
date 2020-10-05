import { ok } from '@/presentation/helpers/http/http-helper'
import { LoadCharactersSpy } from '@/presentation/test/mocks/character'
import { LoadCharactersController } from './load-characters-controller'

type SutTypes = {
  sut: LoadCharactersController
  loadCharactersStub: LoadCharactersSpy
}

const makeSut = (): SutTypes => {
  const loadCharactersStub = new LoadCharactersSpy()
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

  test('hould return 200 on success', async () => {
    const { sut, loadCharactersStub } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(loadCharactersStub.characterModel))
  })
})
