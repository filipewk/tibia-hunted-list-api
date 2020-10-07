import { CharacterModel } from '@/domain/models/character'
import { mockCharacterModel, mockCharacterModels } from '@/domain/test/mocks/character'
import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { DeleteCharacter } from '@/domain/usecases/character/delete-character'
import { LoadCharacters } from '@/domain/usecases/character/load-characters'

export class AddCharacterSpy implements AddCharacter {
  addCharacterParams: AddCharacterParams

  async add (character: AddCharacterParams): Promise<CharacterModel> {
    this.addCharacterParams = character
    return mockCharacterModel()
  }
}

export class LoadCharactersSpy implements LoadCharacters {
  characterModel = mockCharacterModels()

  async load (): Promise<CharacterModel[]> {
    return this.characterModel
  }
}

export class DeleteCharacterSpy implements DeleteCharacter {
  characterId: string

  async remove (id: string): Promise<void> {
    this.characterId = id
  }
}
