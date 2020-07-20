import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest('name')
    }
    if (!httpRequest.body.email) {
      return badRequest('email')
    }
  }
}
