import { LoginControler } from './login-controller'
import { HttpRequest } from './login-controller-protocols'
import { mockAuthenticationParams } from '@/domain/test/mocks'
import { badRequest, unauthorized, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { AuthenticationSpy, EmailValidatorSpy } from '@/presentation/test/mocks'

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
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginControler(authenticationSpy, emailValidatorSpy)
  return {
    sut,
    authenticationSpy,
    emailValidatorSpy
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

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { accessToken, name } = authenticationSpy.authenticationModel
    const authModel = await sut.handle(mockRequest())
    expect(authModel).toEqual(ok({ accessToken, name }))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.emailValidatorResult = false
    const authenticationModel = await sut.handle(mockRequest())
    expect(authenticationModel).toEqual(badRequest(new InvalidParamError('email')))
  })
})
