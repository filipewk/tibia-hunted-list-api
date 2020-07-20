import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param'

const makeSut = (): any => {
  const sut = new SignUpController()
  return sut
}

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const mockRequest = (): any => ({
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    const sut = makeSut()
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
    const sut = makeSut()
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
