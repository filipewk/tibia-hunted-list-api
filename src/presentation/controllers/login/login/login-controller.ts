import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { badRequest, unauthorized } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { Authentication } from '../signup/signup-controller-protocols'

export class LoginControler implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    const requiredField = ['email', 'password']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const authenticationModel = await this.authentication.auth({
      email,
      password
    })
    if (!authenticationModel) {
      return unauthorized()
    }
    return null
  }
}
