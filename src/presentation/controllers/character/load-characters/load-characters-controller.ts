import { LoadCharacters } from '@/domain/usecases/character/load-characters'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class LoadCharactersController implements Controller {
  constructor (private readonly loadCharacters: LoadCharacters) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const characters = await this.loadCharacters.load()
    console.log(characters)
    return ok(characters)
  }
}
