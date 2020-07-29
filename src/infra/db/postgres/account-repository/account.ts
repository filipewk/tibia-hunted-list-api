import { AddAccountRepository, AddAccountParams, AccountModel } from '@/data/usecases/db-add-account-protocols'
import User from '@/infra/db/postgres/models/user'

export class AccountPostgresRepository implements AddAccountRepository {
  async add (data: AddAccountParams): Promise<AccountModel> {
    const account = await User.create(data)
    return account
  }
}
