import { LoginControler } from '@/presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeLoginController = (): LoginControler => {
  const authentication = makeDbAuthentication()
  const emailValidator = new EmailValidatorAdapter()
  return new LoginControler(authentication, emailValidator)
}
