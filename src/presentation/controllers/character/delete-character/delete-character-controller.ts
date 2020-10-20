import { Controller, HttpRequest, HttpResponse } from './delete-character-controller-protocols'
import { InvalidParamError, ServerError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { DeleteCharacter } from '@/domain/usecases/character/delete-character'

export class DeleteCharacterController implements Controller {
  constructor (
    private readonly removeCharacter: DeleteCharacter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { characterId } = httpRequest.params
      const isValid = await this.removeCharacter.remove(characterId)
      if (!isValid) {
        return forbidden(new InvalidParamError('characterId'))
      }
      return noContent()
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
