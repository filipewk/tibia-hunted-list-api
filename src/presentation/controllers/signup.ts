import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { badRequest, serverError, forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation//protocols/controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { AddAccount } from '@/domain/usecases/add-account'
import { Authentication } from '@/domain/usecases/authentication'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = await this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      await this.authentication.auth({
        email,
        password
      })
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
