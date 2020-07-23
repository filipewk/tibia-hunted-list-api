import { EmailValidator } from '@/presentation/protocols'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): any {
    return false
  }
}
