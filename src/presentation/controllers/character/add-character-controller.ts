import { Controller, HttpRequest, HttpResponse } from './add-character-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'

export class AddCharacterController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredField = ['name', 'sex', 'vocation', 'level', 'world', 'residence', 'priority', 'status']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
