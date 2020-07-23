import {
  AddAccountModel,
  AddAccountParams,
  Authentication,
  AuthenticationModel,
  AuthenticationParams,
  AddAccount
} from '@/presentation/controllers/signup-controller-protocols'
import { EmailValidator } from '@/presentation/protocols'
import { mockAccountModel } from '@/domain/tests/mocks/account'
import faker from 'faker'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): any {
      return true
    }
  }
  return new EmailValidatorStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AddAccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return Promise.resolve({
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      })
    }
  }
  return new AuthenticationStub()
}
