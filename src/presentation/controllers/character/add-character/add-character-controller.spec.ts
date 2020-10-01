import { AddCharacterController } from './add-character-controller'
import { HttpRequest } from './add-character-controller-protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers/http/http-helper'
import { CharacterDoesNotExist } from '@/presentation/errors/character-does-not-exist-error'
import { CharacterAlreadyAdded } from '@/presentation/errors/character-already-added'
import { AddCharacterSpy } from '@/presentation/test/mocks/character'
import { CharacterValidatorApiAdapter } from '@/utils/character-validator-api-adapter'

const mockRequest = (): HttpRequest => ({
  body: {
    character: 'On Rails',
    priority: 1
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
  test('Should return 400 if no correct character is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.character = null
    const character = await sut.handle(httpRequest)
    expect(character).toEqual(badRequest(new MissingParamError('character')))
  })

  test('Should return 400 if no correct priority is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.priority = null
    const character = await sut.handle(httpRequest)
    expect(character).toEqual(badRequest(new MissingParamError('priority')))
  })

  test('Should call AddCharacter with correct params', async () => {
    const { sut, addCharacterSpy, characterValidatorApi } = makeSut()
    const addSpy = jest.spyOn(addCharacterSpy, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    const characterData = await characterValidatorApi.isValid(httpRequest.body.character)
    expect(addSpy).toHaveBeenCalledWith({
      name: characterData.name,
      sex: characterData.sex,
      vocation: characterData.vocation,
      level: characterData.level,
      world: characterData.world,
      residence: characterData.residence,
      priority: httpRequest.body.priority,
      status: characterData.account_status
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
    expect(characterSpy).toHaveBeenCalledWith(httpRequest.body.character)
  })

  test('Should return 400 if an invalid character is provided', async () => {
    const { sut, characterValidatorApi } = makeSut()
    jest.spyOn(characterValidatorApi, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new CharacterDoesNotExist()))
  })

  test('Should return 403 with AddAccount returns null', async () => {
    const { sut, addCharacterSpy } = makeSut()
    jest.spyOn(addCharacterSpy, 'add').mockReturnValueOnce(null)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse).toEqual(forbidden(new CharacterAlreadyAdded()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})
