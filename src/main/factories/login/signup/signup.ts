import { SignUpController } from '@/presentation/controllers/signup-controller'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'

export const makeSignUpController = (): SignUpController => {
  const authentication = makeDbAuthentication()
  const dbAddAccount = makeDbAddAccount()
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, dbAddAccount, authentication)
}
