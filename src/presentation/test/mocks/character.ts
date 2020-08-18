import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { CharacterModel } from '@/domain/models/character'
import { mockCharacterModel } from '@/domain/test/mocks/character'

export class AddCharacterSpy implements AddCharacter {
  characterModel = mockCharacterModel()
  addCharacterParams: AddCharacterParams

  async add (character: AddCharacterParams): Promise<CharacterModel> {
    this.addCharacterParams = character
    return await Promise.resolve(this.characterModel)
  }
}
