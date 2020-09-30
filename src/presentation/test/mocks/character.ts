import { CharacterModel } from '@/domain/models/character'
import { mockCharacterModel } from '@/domain/test/mocks/character'
import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'

export class AddCharacterSpy implements AddCharacter {
  addCharacterParams: AddCharacterParams

  async add (character: AddCharacterParams): Promise<CharacterModel> {
    this.addCharacterParams = character
    return mockCharacterModel()
  }
}
