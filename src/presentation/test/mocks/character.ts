import { CharacterModel } from '@/domain/models/character'
import { mockCharacterModel, mockCharacterModels } from '@/domain/test/mocks/character'
import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { DeleteCharacter } from '@/domain/usecases/character/delete-character'
import { LoadCharacterById } from '@/domain/usecases/character/load-character-by-id'
import { LoadCharacters } from '@/domain/usecases/character/load-characters'
import { UpdateCharacter, UpdateCharacterParams } from '@/domain/usecases/character/update-character'

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

  async remove (id: string): Promise<boolean> {
    this.characterId = id
    return true
  }
}

export class LoadCharacterByIdSpy implements LoadCharacterById {
  characterId: string
  characterModel = mockCharacterModel()

  async load (id: string): Promise<CharacterModel> {
    this.characterId = id
    return this.characterModel
  }
}

export class UpdateCharacterSpy implements UpdateCharacter {
  characterId: string
  name: string
  level: string
  status: string
  priority: number

  async update (data: UpdateCharacterParams): Promise<boolean> {
    this.characterId = data.characterId
    this.name = data.name
    this.level = data.level
    this.status = data.status
    this.priority = data.priority
    return true
  }
}
