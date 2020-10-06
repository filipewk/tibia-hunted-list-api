import { makeDbLoadCharacters } from '@/main/factories/usecases/character/load-characters/db-load-characters-factory'
import { LoadCharactersController } from '@/presentation/controllers/character/load-characters/load-characters-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadCharactersController = (): Controller => {
  return new LoadCharactersController(makeDbLoadCharacters())
}
