import { UpdateCharacterController } from './update-character-controller'
import { HttpRequest, LoadCharacterByIdSpy } from './update-character-controller-protocols'
import { UpdateCharacterSpy } from '../add-character/add-character-controller-protocols'
import { ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'On Rails',
    level: '100',
    status: 'Free Account',
    priority: 1
  },
  params: {
    characterId: 'any_id'
  }
})

type SutTypes = {
  sut: UpdateCharacterController
  loadCharacterByIdStub: LoadCharacterByIdSpy
  updateCharacterStub: UpdateCharacterSpy
}

const makeSut = (): SutTypes => {
  const updateCharacterStub = new UpdateCharacterSpy()
  const loadCharacterByIdStub = new LoadCharacterByIdSpy()
  const sut = new UpdateCharacterController(loadCharacterByIdStub, updateCharacterStub)
  return {
    sut,
    loadCharacterByIdStub,
    updateCharacterStub
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

  test('Should call UpdateCharacter with correct values', async () => {
    const { sut, updateCharacterStub } = makeSut()
    const loadSpy = jest.spyOn(updateCharacterStub, 'update')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    const { name, level, status, priority, characterId } = updateCharacterStub
    expect(loadSpy).toHaveBeenCalledWith({
      characterId,
      name,
      level,
      status,
      priority
    })
  })

  test('Should return 204 if update character succeed', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(noContent())
  })

  test('Should return 500 if UpdateCharacter throw', async () => {
    const { sut, updateCharacterStub } = makeSut()
    jest.spyOn(updateCharacterStub, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
