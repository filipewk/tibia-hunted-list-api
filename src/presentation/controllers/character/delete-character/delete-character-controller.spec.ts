import { RemoveCharacterController } from './delete-character-controller'
import { HttpRequest, DeleteCharacterSpy } from './delete-character-controller-protocols'
import { ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({
  params: {
    characterId: 'any_id'
  }
})

type SutTypes = {
  sut: RemoveCharacterController
  removeCharacterStub: DeleteCharacterSpy
}

const makeSut = (): SutTypes => {
  const removeCharacterStub = new DeleteCharacterSpy()
  const sut = new RemoveCharacterController(removeCharacterStub)
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

  test('Should return 500 if RemoveCharacter throw', async () => {
    const { sut, removeCharacterStub } = makeSut()
    jest.spyOn(removeCharacterStub, 'remove').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
