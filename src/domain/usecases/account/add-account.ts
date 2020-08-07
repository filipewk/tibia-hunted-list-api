import { AccountModel } from '../../models/account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
