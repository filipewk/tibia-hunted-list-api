import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'
import faker from 'faker'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12
const valueToHash = faker.random.uuid()

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(valueToHash)
      expect(hashSpy).toHaveBeenCalledWith(valueToHash, salt)
    })

    test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash(valueToHash)
      expect(hash).toBe('hash')
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
      const promise = sut.hash(valueToHash)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call comparer with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(valueToHash, 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith(valueToHash, 'any_hash')
    })

    test('Should return false if comparer fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isValid = await sut.compare(valueToHash, 'any_hash')
      expect(isValid).toBe(false)
    })
  })
})
