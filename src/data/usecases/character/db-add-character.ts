import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { CharacterModel } from '@/domain/models/character'

export class DbAddCharacter implements AddCharacter {
  constructor (
    private readonly addCharacterRepository: AddCharacterRepository
  ) {}

  async add (character: AddCharacterParams): Promise<CharacterModel> {
    const characterData = await this.addCharacterRepository.add(character)
    return characterData
  }
}
