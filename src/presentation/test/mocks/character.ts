import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'

export class AddCharacterSpy implements AddCharacter {
  addCharacterParams: AddCharacterParams

  async add (character: AddCharacterParams): Promise<void> {
    this.addCharacterParams = character
    return null
  }
}
