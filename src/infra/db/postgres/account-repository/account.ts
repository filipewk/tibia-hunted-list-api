import { AddAccountRepository, AddAccountParams, LoadAccountByEmailRepository } from '@/data/usecases/account/add-account/db-add-account-protocols'
import User from '@/infra/db/postgres/models/user'
import { AccountModel } from '@/domain/models/account'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'

export class AccountPostgresRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (data: AddAccountParams): Promise<AccountModel> {
    const account = await User.create(data)
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = User.findOne({
      where: {
        email
      }
    })
    return await account
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const account = await User.findByPk(id)
    account.accessToken = token
    await account.save()
  }
}
