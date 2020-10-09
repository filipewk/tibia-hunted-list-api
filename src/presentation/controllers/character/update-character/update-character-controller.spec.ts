import { noContent } from '@/presentation/helpers/http/http-helper'
import { UpdateCharacterController } from './update-character-controller'
import { HttpRequest, LoadCharacterByIdSpy } from './update-character-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    characterId: 'any_id'
  }
})

type SutTypes = {
  sut: UpdateCharacterController
  loadCharacterByIdStub: LoadCharacterByIdSpy
}

const makeSut = (): SutTypes => {
  const loadCharacterByIdStub = new LoadCharacterByIdSpy()
  const sut = new UpdateCharacterController(loadCharacterByIdStub)
  return {
    sut,
    loadCharacterByIdStub
  }
}

describe('UpdateCharacter Controller', () => {
  test('Should call LoadCharacterById with correct id', async () => {
    const { sut, loadCharacterByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadCharacterByIdStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(loadCharacterByIdStub.characterId)
  })

  test('Should return 204 if update character succeed', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(noContent())
  })
})
