import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AuthenticationModel } from '@/domain/models/authentication'
import { LoadAccountByEmailRepository } from '../add-account/db-add-account-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return Promise.resolve(null)
  }
}
