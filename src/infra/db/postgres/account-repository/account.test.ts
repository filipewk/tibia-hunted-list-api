import { AccountPostgresRepository } from './account'
import User from '@/infra/db/postgres/models/user'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { mockAccountModel, mockAddAccountParams } from '@/domain/test/mocks'
import env from '@/main/config/env'
import faker from 'faker'

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
      const addAccountParams = mockAddAccountParams()
      const dbAccount = await sut.add(addAccountParams)
      expect(dbAccount).toBeTruthy()
      expect(dbAccount.id).toBeTruthy()
      expect(dbAccount.name).toBe(addAccountParams.name)
      expect(dbAccount.email).toBe(addAccountParams.email)
      expect(dbAccount.password).toBe(addAccountParams.password)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await sut.add(addAccountParams)
      const dbAccount = await sut.loadByEmail(addAccountParams.email)
      expect(dbAccount).toBeTruthy()
      expect(dbAccount.id).toBeTruthy()
      expect(dbAccount.name).toBe(addAccountParams.name)
      expect(dbAccount.email).toBe(addAccountParams.email)
      expect(dbAccount.password).toBe(addAccountParams.password)
    })

    test('Should return null with LoadByEmail fails', async () => {
      const sut = makeSut()
      const dbAccount = await sut.loadByEmail(account.email)
      expect(dbAccount).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should return the account accessToken on success', async () => {
      const sut = makeSut()
      const dbAccount = await sut.add(mockAddAccountParams())
      expect(dbAccount.accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(dbAccount.id, accessToken)
      const account = await User.findByPk(dbAccount.id)
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })
})
