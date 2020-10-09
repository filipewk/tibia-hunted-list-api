import { Controller, HttpRequest, HttpResponse } from './update-character-controller-protocols'
import { LoadCharacterById } from '@/domain/usecases/character/load-character-by-id'
import { noContent } from '@/presentation/helpers/http/http-helper'

export class UpdateCharacterController implements Controller {
  constructor (
    private readonly loadCharacterById: LoadCharacterById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { characterId } = httpRequest.params
    await this.loadCharacterById.load(characterId)
    return noContent()
  }
}
