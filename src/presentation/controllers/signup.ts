import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http/http-helper'
import { Controller } from '../protocols/controller'
import { InvalidParamError } from '../errors/invalid-param'
import { MissingParamError } from '../errors/missing-param'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: any
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
