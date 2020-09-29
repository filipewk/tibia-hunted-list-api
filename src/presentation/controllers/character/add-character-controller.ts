import { Controller, HttpRequest, HttpResponse } from './add-character-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { AddCharacter } from '@/domain/usecases/character/add-character'
import { CharacterValidatorApiAdapter } from '@/utils/character-validator-api-adapter'
import { CharacterDoesNotExist } from '@/presentation/errors/character-does-not-exist-error'

export class AddCharacterController implements Controller {
  constructor (
    private readonly addCharacter: AddCharacter,
    private readonly characterApiValidator: CharacterValidatorApiAdapter
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
      const tibiaDataApi = await this.characterApiValidator.isValid(name)
      if (!tibiaDataApi) {
        return badRequest(new CharacterDoesNotExist())
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
      return noContent()
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
