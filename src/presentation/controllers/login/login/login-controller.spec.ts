import { mockAuthenticationParams } from '@/domain/test/mocks'
import { LoginControler } from './login-controller'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, unauthorized, serverError } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { AuthenticationSpy } from '@/presentation/test/mocks'

const loginModel = mockAuthenticationParams()

const mockRequest = (): HttpRequest => ({
  body: {
    email: loginModel.email,
    password: loginModel.password
  }
})

type SutTypes = {
  sut: LoginControler
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginControler(authenticationSpy)
  return {
    sut,
    authenticationSpy
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.email = null
    const authenticationModel = await sut.handle(httpRequest)
    expect(authenticationModel).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.password = null
    const authenticationModel = await sut.handle(httpRequest)
    expect(authenticationModel).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const authSpy = jest.spyOn(authenticationSpy, 'auth')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(null)
    const authModel = await sut.handle(mockRequest())
    expect(authModel).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(new Error())
    const authModel = await sut.handle(mockRequest())
    expect(authModel).toEqual(serverError(new Error()))
  })
})
