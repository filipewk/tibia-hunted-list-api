import { AccountPostgresRepository } from './account'
import { SequelizeHelper } from '../helpers/sequelize-helper'
import { mockAccountModel } from '@/domain/test/mocks'
import User from '../models/user'

const account = mockAccountModel()

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    SequelizeHelper.connect()
  })

  afterAll(async () => {
    SequelizeHelper.disconnect()
    await User.destroy({ truncate: true })
  })

  test('Should return an account on success', async () => {
    const sut = new AccountPostgresRepository()
    const dbAccount = await sut.add({
      name: account.name,
      email: account.email,
      password: account.password
    })
    expect(dbAccount).toBeTruthy()
    expect(dbAccount.id).toBeTruthy()
    expect(dbAccount.name).toBe(account.name)
    expect(dbAccount.email).toBe(account.email)
    expect(dbAccount.password).toBe(account.password)
  })
})
