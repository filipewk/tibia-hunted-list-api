import { LoadCharacters } from '@/domain/usecases/character/load-characters'
import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class LoadCharactersController implements Controller {
  constructor (private readonly loadCharacters: LoadCharacters) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const characters = await this.loadCharacters.load()
      return ok(characters)
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
