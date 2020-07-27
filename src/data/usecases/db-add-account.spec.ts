import { DbAddAccount } from './db-add-account'
import { mockAddAccountParams } from '@/domain/test/mocks/account'
import { HasherSpy } from '@/data/test/mocks/mock-criptography'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const sut = new DbAddAccount(hasherSpy)
  return {
    sut,
    hasherSpy
  }
}

describe('DbAddAccount Usecases', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())
    const addAccountParams = mockAddAccountParams()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow()
  })
})
