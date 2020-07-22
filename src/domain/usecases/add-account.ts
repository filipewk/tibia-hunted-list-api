import { AddAccountModel } from '../models/account'

export type AddAccountParams = Omit<AddAccountModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AddAccountModel>
}
