import { noContent } from '@/presentation/helpers/http/http-helper'
import { RemoveCharacterSpy } from '@/presentation/test/mocks/character'
import { HttpRequest } from '../../login/login/login-controller-protocols'
import { RemoveCharacterController } from './delete-character-controller'

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

const mockRequest = (): HttpRequest => ({
  params: {
    characterId: 'any_id'
  }
})

describe('RemoveCharacter Controller', () => {
  test('Should call RemoveCharacter', async () => {
    const { sut, removeCharacterStub } = makeSut()
    const removeSpy = jest.spyOn(removeCharacterStub, 'remove')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(removeSpy).toHaveBeenCalled()
  })

  test('Should return 204 if deleted character succeed', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
