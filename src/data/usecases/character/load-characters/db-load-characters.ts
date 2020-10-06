import { LoadCharactersRepository } from '@/data/protocols/db/character/load-characters-repository'
import { CharacterModel } from '@/domain/models/character'
import { LoadCharacters } from '@/domain/usecases/character/load-characters'

export class DbLoadCharacters implements LoadCharacters {
  constructor (private readonly loadCharactersRepository: LoadCharactersRepository) {}

  async load (): Promise<CharacterModel> {
    await this.loadCharactersRepository.loadAll()
    return null
  }
}
