import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import Character from '../models/character'

export class CharacterPostgresRepository implements AddCharacterRepository {
  async add (characterData: AddCharacterParams): Promise<void> {
    await Character.create(characterData)
  }
}
