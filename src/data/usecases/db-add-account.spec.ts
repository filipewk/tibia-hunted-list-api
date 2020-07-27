import { DbAddAccount } from './db-add-account'
import { mockAddAccountParams } from '@/domain/test/mocks/account'
import { HasherSpy } from '@/data/test/mocks/mock-criptography'

describe('DbAddAccount Usecases', () => {
  test('Should call Hasher with correct password', async () => {
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy)
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })
})
