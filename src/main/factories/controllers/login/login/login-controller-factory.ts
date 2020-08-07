import { LoginControler } from '@/presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'

export const makeLoginController = (): LoginControler => {
  const authentication = makeDbAuthentication()
  return new LoginControler(authentication)
}
