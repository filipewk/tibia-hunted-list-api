import { AddAccountRepository, AddAccountParams, LoadAccountByEmailRepository } from '@/data/usecases/account/add-account/db-add-account-protocols'
import User from '@/infra/db/postgres/models/user'
import { AccountModel } from '@/domain/models/account'

export class AccountPostgresRepository implements AddAccountRepository, LoadAccountByEmailRepository {
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
    return account
  }
}
