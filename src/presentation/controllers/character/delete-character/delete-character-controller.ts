import { RemoveCharacter } from '@/domain/usecases/character/delete-character'
import { ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class RemoveCharacterController implements Controller {
  constructor (
    private readonly removeCharacter: RemoveCharacter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { characterId } = httpRequest.params
      await this.removeCharacter.remove(characterId)
      return noContent()
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
