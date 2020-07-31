import { AddAccountRepository, AddAccountParams } from '@/data/usecases/account/add-account/db-add-account-protocols'
import User from '@/infra/db/postgres/models/user'
import { AccountModel } from '@/domain/models/account'

export class AccountPostgresRepository implements AddAccountRepository {
  async add (data: AddAccountParams): Promise<AccountModel> {
    const account = await User.create(data)
    return account
  }
}
