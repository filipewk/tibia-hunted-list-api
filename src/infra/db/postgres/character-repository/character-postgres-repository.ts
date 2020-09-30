import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { CharacterModel } from '@/domain/models/character'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import Character from '../models/character'

export class CharacterPostgresRepository implements AddCharacterRepository {
  async add (characterData: AddCharacterParams): Promise<CharacterModel> {
    const character = await Character.create(characterData)
    return character
  }
}
