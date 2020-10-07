import { DeleteCharacterController } from './delete-character-controller'
import { HttpRequest, DeleteCharacterSpy } from './delete-character-controller-protocols'
import { InvalidParamError, ServerError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({
  params: {
    characterId: 'any_id'
  }
})

type SutTypes = {
  sut: DeleteCharacterController
  removeCharacterStub: DeleteCharacterSpy
}

const makeSut = (): SutTypes => {
  const removeCharacterStub = new DeleteCharacterSpy()
  const sut = new DeleteCharacterController(removeCharacterStub)
  return {
    sut,
    removeCharacterStub
  }
}

describe('RemoveCharacter Controller', () => {
  test('Should call RemoveCharacter with correct id', async () => {
    const { sut, removeCharacterStub } = makeSut()
    const removeSpy = jest.spyOn(removeCharacterStub, 'remove')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(removeSpy).toHaveBeenCalledWith(removeCharacterStub.characterId)
  })

  test('Should return 204 if deleted character succeed', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 400 if an invalid id is provided', async () => {
    const { sut, removeCharacterStub } = makeSut()
    jest.spyOn(removeCharacterStub, 'remove').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('characterId')))
  })

  test('Should return 500 if RemoveCharacter throw', async () => {
    const { sut, removeCharacterStub } = makeSut()
    jest.spyOn(removeCharacterStub, 'remove').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
