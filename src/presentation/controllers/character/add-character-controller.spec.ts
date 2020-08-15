import { AddCharacterController } from './add-character-controller'
import { HttpRequest } from './add-character-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    sex: 'any_sex',
    vocation: 'any_vocation',
    level: 50,
    world: 'any_world',
    residence: 'any_residence',
    priority: 1,
    status: 'any_status'
  }
})

describe('AddCharacter Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new AddCharacterController()
    const httpRequest = mockRequest()
    httpRequest.body.name = null
    const character = await sut.handle(httpRequest)
    expect(character).toEqual(badRequest(new MissingParamError('name')))
  })
})
