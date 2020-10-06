import { ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { RemoveCharacterSpy } from '@/presentation/test/mocks/character'
import { HttpRequest } from '../../login/login/login-controller-protocols'
import { RemoveCharacterController } from './delete-character-controller'

const mockRequest = (): HttpRequest => ({
  params: {
    characterId: 'any_id'
  }
})

type SutTypes = {
  sut: RemoveCharacterController
  removeCharacterStub: RemoveCharacterSpy
}

const makeSut = (): SutTypes => {
  const removeCharacterStub = new RemoveCharacterSpy()
  const sut = new RemoveCharacterController(removeCharacterStub)
  return {
    sut,
    removeCharacterStub
  }
}

describe('RemoveCharacter Controller', () => {
  test('Should call RemoveCharacter', async () => {
    const { sut, removeCharacterStub } = makeSut()
    const removeSpy = jest.spyOn(removeCharacterStub, 'remove')
    await sut.handle(mockRequest())
    expect(removeSpy).toHaveBeenCalled()
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
