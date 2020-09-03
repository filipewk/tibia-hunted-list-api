import { AddCharacterController } from './add-character-controller'
import { HttpRequest } from './add-character-controller-protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { AddCharacterSpy } from '@/presentation/test/mocks/character'
import { CharacterValidatorApiAdapter } from '@/utils/character-validator-api-adapter'
import { CharacterDoesNotExist } from '@/presentation/errors/character-does-not-exist-error'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'On Rails',
    sex: 'any_sex',
    vocation: 'any_vocation',
    level: 50,
    world: 'any_world',
    residence: 'any_residence',
    priority: 1,
    status: 'any_status'
  }
})

type SutTypes = {
  sut: AddCharacterController
  addCharacterSpy: AddCharacterSpy
  characterValidatorApi: CharacterValidatorApiAdapter
}

const makeSut = (): SutTypes => {
  const addCharacterSpy = new AddCharacterSpy()
  const characterValidatorApi = new CharacterValidatorApiAdapter()
  const sut = new AddCharacterController(addCharacterSpy, characterValidatorApi)
  return {
    sut,
    addCharacterSpy,
    characterValidatorApi
  }
}

describe('AddCharacter Controller', () => {
  test('Should return 400 if no correct model is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const character = await sut.handle(httpRequest)
    const requiredField = ['name', 'sex', 'vocation', 'level', 'world', 'residence', 'priority', 'status']
    for (const field of requiredField) {
      httpRequest.body.field = null
      if (!httpRequest.body[field]) {
        expect(character).toEqual(badRequest(new MissingParamError(field)))
      }
    }
  })

  test('Should call AddCharacter with correct params', async () => {
    const { sut, addCharacterSpy } = makeSut()
    const addSpy = jest.spyOn(addCharacterSpy, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      sex: httpRequest.body.sex,
      vocation: httpRequest.body.vocation,
      level: httpRequest.body.level,
      world: httpRequest.body.world,
      residence: httpRequest.body.residence,
      priority: httpRequest.body.priority,
      status: httpRequest.body.status
    })
  })

  test('Should return 500 if AddCharacter throws', async () => {
    const { sut, addCharacterSpy } = makeSut()
    jest.spyOn(addCharacterSpy, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call CharacterValidatorApi with a same name of request', async () => {
    const { sut, characterValidatorApi } = makeSut()
    const characterSpy = jest.spyOn(characterValidatorApi, 'isValid')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(characterSpy).toHaveBeenCalledWith(httpRequest.body.name)
  })

  test('Should return 400 if an invalid character is provided', async () => {
    const { sut, characterValidatorApi } = makeSut()
    jest.spyOn(characterValidatorApi, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new CharacterDoesNotExist()))
  })

  test('Should call CharacterValidatorApi with a same name of request', async () => {
    const { sut, characterValidatorApi } = makeSut()
    const characterSpy = jest.spyOn(characterValidatorApi, 'isValid')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(characterSpy).toHaveBeenCalledWith(httpRequest.body.name)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})