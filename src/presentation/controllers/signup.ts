import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation//protocols/controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: any
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = await this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return null
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
