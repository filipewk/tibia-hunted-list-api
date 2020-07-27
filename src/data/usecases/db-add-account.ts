import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AddAccountModel } from '@/domain/models/account'
import { AddAccountParams, AddAccount } from '@/domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (accountData: AddAccountParams): Promise<AddAccountModel> {
    await this.hasher.hash(accountData.password)
    return null
  }
}
