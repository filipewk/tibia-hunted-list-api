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

export class LoadCharactersSpy implements LoadCharacters {
  characterModel = mockCharacterModel()

  async load (): Promise<CharacterModel> {
    return this.characterModel
  }
}
