import { AccountPostgresRepository } from './account'
import User from '@/infra/db/postgres/models/user'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { mockAccountModel } from '@/domain/test/mocks'
import env from '@/main/config/env'

const account = mockAccountModel()

const makeSut = (): AccountPostgresRepository => {
  return new AccountPostgresRepository()
}

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    sequelizeHelper.connect(env.postgresUrl)
  })

  afterAll(async () => {
    await sequelizeHelper.disconnect()
  })

  beforeEach(async () => {
    await User.destroy({ truncate: true })
  })

  describe('add()', () => {
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

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      await sut.add({
        name: account.name,
        email: account.email,
        password: account.password
      })
      const dbAccount = await sut.loadByEmail(account.email)
      expect(dbAccount).toBeTruthy()
      expect(dbAccount.id).toBeTruthy()
      expect(dbAccount.name).toBe(account.name)
      expect(dbAccount.email).toBe(account.email)
      expect(dbAccount.password).toBe(account.password)
    })
  })
})
