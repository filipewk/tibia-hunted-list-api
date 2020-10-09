import { Controller, HttpRequest, HttpResponse } from './update-character-controller-protocols'
import { LoadCharacterById } from '@/domain/usecases/character/load-character-by-id'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { UpdateCharacter } from '@/domain/usecases/character/update-character'

export class UpdateCharacterController implements Controller {
  constructor (
    private readonly loadCharacterById: LoadCharacterById,
    private readonly updateCharacter: UpdateCharacter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { characterId } = httpRequest.params
    const { name, level, status, priority } = httpRequest.body
    await this.loadCharacterById.load(characterId)
    await this.updateCharacter.update({
      characterId,
      name,
      level,
      status,
      priority
    })
    return noContent()
  }
}
