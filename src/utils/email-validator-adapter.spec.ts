import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'
import faker from 'faker'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const email = faker.internet.email()

const makeSut = (): EmailValidatorAdapter => {
  const sut = new EmailValidatorAdapter()
  return sut
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator retuns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })

  test('Should return true if validator retuns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(email)
    expect(isValid).toBe(true)
  })
})
