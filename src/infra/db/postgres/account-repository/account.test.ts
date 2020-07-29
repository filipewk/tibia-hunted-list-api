import { AccountPostgresRepository } from './account'
import User from '@/infra/db/postgres/models/user'
import { SequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { mockAccountModel } from '@/domain/test/mocks'

const account = mockAccountModel()

const makeSut = (): AccountPostgresRepository => {
  return new AccountPostgresRepository()
}

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    SequelizeHelper.connect()
  })

  afterAll(() => {
    SequelizeHelper.disconnect()
  })

  beforeEach(async () => {
    await User.destroy({ truncate: true })
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
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
