import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (plaintext: string): Promise<string> {
    await jwt.sign({ id: plaintext }, this.secret)
    return Promise.resolve(null)
  }
}
