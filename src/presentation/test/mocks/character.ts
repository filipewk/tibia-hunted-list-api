import { CharacterModel } from '@/domain/models/character'
import { mockCharacterModel } from '@/domain/test/mocks/character'
import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { LoadCharacters } from '@/domain/usecases/character/load-characters'

export class AddCharacterSpy implements AddCharacter {
  addCharacterParams: AddCharacterParams

  async add (character: AddCharacterParams): Promise<CharacterModel> {
    this.addCharacterParams = character
    return mockCharacterModel()
  }
}

export const mockLoadCharacters = (): LoadCharacters => {
  class LoadCharactersStub implements LoadCharacters {
    async load (): Promise<CharacterModel> {
      return mockCharacterModel()
    }
  }
  return new LoadCharactersStub()
}
