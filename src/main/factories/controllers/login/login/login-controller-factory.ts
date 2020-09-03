import { LoginControler } from '@/presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  const authentication = makeDbAuthentication()
  const emailValidator = new EmailValidatorAdapter()
  return new LoginControler(authentication, emailValidator)
}
