import { Controller, HttpRequest, HttpResponse, LoadCharacters } from './load-character-controller-protocols'
import { ServerError } from '@/presentation/errors'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

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
