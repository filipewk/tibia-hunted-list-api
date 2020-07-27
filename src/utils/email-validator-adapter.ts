import { EmailValidator } from '@/presentation/protocols'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): any {
    return validator.isEmail(email)
  }
}
