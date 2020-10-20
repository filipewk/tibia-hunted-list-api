import { Controller, HttpRequest, HttpResponse } from './update-character-controller-protocols'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { UpdateCharacter } from '@/domain/usecases/character/update-character'
import { InvalidParamError, ServerError } from '@/presentation/errors'

export class UpdateCharacterController implements Controller {
  constructor (
    private readonly updateCharacter: UpdateCharacter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { characterId } = httpRequest.params
      const { name, level, status, priority } = httpRequest.body
      const isValid = await this.updateCharacter.update({
        characterId,
        name,
        level,
        status,
        priority
      })
      if (!isValid) {
        return forbidden(new InvalidParamError('characterId'))
      }
      return noContent()
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
