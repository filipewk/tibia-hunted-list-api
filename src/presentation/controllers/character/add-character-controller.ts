import { Controller, HttpRequest, HttpResponse } from './add-character-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'

export class AddCharacterController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
  }
}
