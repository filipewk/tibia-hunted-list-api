import { Controller, HttpRequest, HttpResponse } from './delete-character-controller-protocols'
import { ServerError } from '@/presentation/errors'
import { noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { RemoveCharacter } from '@/domain/usecases/character/delete-character'

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
