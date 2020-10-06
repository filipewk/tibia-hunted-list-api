import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { LoadCharacterByNameRepository } from '@/data/protocols/db/character/load-character-by-name-repository'
import { LoadCharactersRepository } from '@/data/protocols/db/character/load-characters-repository'
import { CharacterModel } from '@/domain/models/character'
import { mockCharacterModel } from '@/domain/test/mocks/character'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'

export const mockAddCharacterRepository = (): AddCharacterRepository => {
  class AddCharacterRepositoryStub implements AddCharacterRepository {
    async add (characterData: AddCharacterParams): Promise<CharacterModel> {
      return null
    }
  }
  return new AddCharacterRepositoryStub()
}

export class LoadCharacterByNameRepositorySpy implements LoadCharacterByNameRepository {
  characterModel = mockCharacterModel()
  character: string

  async loadByName (character: string): Promise<CharacterModel> {
    this.character = character
    return this.characterModel
  }
}

export class LoadCharactersRepositorySpy implements LoadCharactersRepository {
  characterModel = mockCharacterModel()

  async loadAll (): Promise<CharacterModel> {
    return this.characterModel
  }
}
