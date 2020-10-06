import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
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

  test('hould return 500 if LoadCharacters throw', async () => {
    const { sut, loadCharactersStub } = makeSut()
    jest.spyOn(loadCharactersStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})