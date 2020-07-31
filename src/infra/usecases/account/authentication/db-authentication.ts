import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AuthenticationModel } from '@/domain/models/authentication'
import { LoadAccountByEmailRepository } from '../add-account/db-add-account-protocols'
import { HashComparer } from '@/data/protocols/cryptography/hasher-comparer'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter

  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        await this.encrypter.encrypt(account.id)
        return {
          accessToken: 'any_token',
          name: 'any_name'
        }
      }
    }
    return null
  }
}
