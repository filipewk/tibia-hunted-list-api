import { Controller, HttpRequest, HttpResponse } from './add-character-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { AddCharacter } from '@/domain/usecases/character/add-character'

export class AddCharacterController implements Controller {
  constructor (
    private readonly addCharacter: AddCharacter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, sex, vocation, level, world, residence, priority, status } = httpRequest.body
      const requiredField = ['name', 'sex', 'vocation', 'level', 'world', 'residence', 'priority', 'status']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      await this.addCharacter.add({
        name,
        sex,
        vocation,
        level,
        world,
        residence,
        priority,
        status
      })
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
