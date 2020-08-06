import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'

export class LoginControler implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
