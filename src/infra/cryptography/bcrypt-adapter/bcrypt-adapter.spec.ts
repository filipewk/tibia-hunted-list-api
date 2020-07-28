import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'
import faker from 'faker'

const salt = 12
const valueToHash = faker.random.uuid()

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = new BcryptAdapter(salt)
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(valueToHash)
      expect(hashSpy).toHaveBeenCalledWith(valueToHash, salt)
    })
  })
})
