import { Controller, HttpRequest, HttpResponse } from './load-character-controller-protocols'
import { ServerError } from '@/presentation/errors'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCharacters } from '@/domain/usecases/character/load-characters'

export class LoadCharactersController implements Controller {
  constructor (private readonly loadCharacters: LoadCharacters) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const characters = await this.loadCharacters.load()
      return characters.length ? ok(characters) : noContent()
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}
