import { SignUpController } from './signup'

const mockRequest = (): any => ({
  body: {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeSut = (): any => {
  const sut = new SignUpController()
  return sut
}

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httpResponse = sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
