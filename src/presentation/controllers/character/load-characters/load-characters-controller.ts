import { LoadCharacters } from '@/domain/usecases/character/load-characters'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class LoadCharactersController implements Controller {
  constructor (private readonly loadCharacters: LoadCharacters) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadCharacters.load()
    return null
  }
}
