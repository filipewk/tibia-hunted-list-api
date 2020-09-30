import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { CharacterModel } from '@/domain/models/character'
import { LoadCharacterByNameRepository } from '@/data/protocols/db/character/load-character-by-name-repository'

export class DbAddCharacter implements AddCharacter {
  constructor (
    private readonly addCharacterRepository: AddCharacterRepository,
    private readonly loadCharacterByNameRepository: LoadCharacterByNameRepository
  ) {}

  async add (character: AddCharacterParams): Promise<CharacterModel> {
    const characterData = await this.loadCharacterByNameRepository.loadByName(character.name)
    if (!characterData) {
      const newCharacter = await this.addCharacterRepository.add(character)
      return newCharacter
    }
    return null
  }
}
