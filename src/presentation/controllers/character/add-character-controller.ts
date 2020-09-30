import { Controller, HttpRequest, HttpResponse } from './add-character-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddCharacter } from '@/domain/usecases/character/add-character'
import { CharacterValidatorApiAdapter } from '@/utils/character-validator-api-adapter'
import { CharacterDoesNotExist } from '@/presentation/errors/character-does-not-exist-error'
import { CharacterAlreadyAdded } from '@/presentation/errors/character-already-added'

export class AddCharacterController implements Controller {
  constructor (
    private readonly addCharacter: AddCharacter,
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
      const { name, sex, vocation, level, world, residence } = tibiaDataApi

      const characterData = await this.addCharacter.add({
        name,
        sex,
        vocation,
        level,
        world,
        residence,
        priority,
        status: tibiaDataApi.account_status
      })
      console.log('dentro', characterData)
      if (!characterData) {
        return forbidden(new CharacterAlreadyAdded())
      }
      return noContent()
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
