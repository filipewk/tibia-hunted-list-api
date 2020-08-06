import { mockAuthenticationParams } from '@/domain/test/mocks'
import { LoginControler } from './login-controller'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'

const loginModel = mockAuthenticationParams()

const mockRequest = (): HttpRequest => ({
  body: {
    email: loginModel.email,
    password: loginModel.password
  }
})

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginControler()
    const httpRequest = mockRequest()
    httpRequest.body.email = null
    const authenticationModel = await sut.handle(httpRequest)
    expect(authenticationModel).toEqual(badRequest(new MissingParamError('email')))
  })
})
