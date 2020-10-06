import { RemoveCharacter } from '@/domain/usecases/character/delete-character'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class RemoveCharacterController implements Controller {
  constructor (
    private readonly removeCharacter: RemoveCharacter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { characterId } = httpRequest.params
    await this.removeCharacter.remove(characterId)
    return noContent()
  }
}
