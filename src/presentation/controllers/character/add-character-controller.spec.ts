import { AddCharacterController } from './add-character-controller'
import { HttpRequest } from './add-character-controller-protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { AddCharacterSpy } from '@/presentation/test/mocks/character'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.internet.userName(),
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
}

const makeSut = (): SutTypes => {
  const addCharacterSpy = new AddCharacterSpy()
  const sut = new AddCharacterController(addCharacterSpy)
  return {
    sut,
    addCharacterSpy
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
})
