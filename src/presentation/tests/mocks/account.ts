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

export class EmailValidatorSpy implements EmailValidator {
  emailValidatorResult = true

  isValid (email: string): any {
    return this.emailValidatorResult
  }
}

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AddAccountModel> {
    this.addAccountParams = account
    return Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return Promise.resolve(this.authenticationModel)
  }
}
