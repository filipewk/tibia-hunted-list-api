import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation//protocols/controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { EmailValidator } from '../protocols/email-validator'
import { AddAccount } from '@/domain/usecases/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
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
      await this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
