import { Hasher, AccountModel, AddAccountParams, AddAccount } from './db-add-account-protocols'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return null
  }
}
