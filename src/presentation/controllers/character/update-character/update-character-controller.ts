import { Controller, HttpRequest, HttpResponse, CharacterValidatorApiAdapter } from './update-character-controller-protocols'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { UpdateCharacter } from '@/domain/usecases/character/update-character'
import { CharacterDoesNotExist, InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'

export class UpdateCharacterController implements Controller {
  constructor (
    private readonly updateCharacter: UpdateCharacter,
    private readonly characterApiValidator: CharacterValidatorApiAdapter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { character, priority } = httpRequest.body
      const requiredField = ['character', 'priority']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const tibiaDataApi = await this.characterApiValidator.isValid(character)
      if (!tibiaDataApi) {
        return badRequest(new CharacterDoesNotExist())
      }
      const { characterId } = httpRequest.params
      const { name, sex, vocation, level, world, residence } = tibiaDataApi
      const isValid = await this.updateCharacter.update({
        characterId,
        name,
        sex,
        vocation,
        level,
        world,
        residence,
        status: tibiaDataApi.account_status,
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
