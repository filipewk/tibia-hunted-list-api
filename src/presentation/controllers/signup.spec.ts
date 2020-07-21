import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param'
import { InvalidParamError } from '../errors/invalid-param'

const mockEmailValidator = (): any => {
  class EmailValidatorStub {
    isValid (email: string): any {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): any => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const mockRequest = (): any => ({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    const { sut } = makeSut()
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const mockRequest = (): any => ({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    const { sut } = makeSut()
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const mockRequest = (): any => ({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    })
    const { sut } = makeSut()
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const mockRequest = (): any => ({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    const { sut } = makeSut()
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const mockRequest = (): any => ({
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
