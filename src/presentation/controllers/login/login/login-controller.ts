import { Controller, HttpRequest, HttpResponse, Authentication } from './login-controller-protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, unauthorized, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { EmailValidator } from '@/presentation/protocols'

export class LoginControler implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredField = ['email', 'password']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = await this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
