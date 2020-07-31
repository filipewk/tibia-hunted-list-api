import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AuthenticationModel } from '@/domain/models/authentication'
import { LoadAccountByEmailRepository } from '../add-account/db-add-account-protocols'
import { HashComparer } from '@/data/protocols/cryptography/hasher-comparer'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        return {
          accessToken: 'any_token',
          name: 'any_name'
        }
      }
    }
    return null
  }
}
