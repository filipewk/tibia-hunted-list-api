import { Hasher, AddAccountModel, AddAccountParams, AddAccount } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (accountData: AddAccountParams): Promise<AddAccountModel> {
    await this.hasher.hash(accountData.password)
    return null
  }
}
