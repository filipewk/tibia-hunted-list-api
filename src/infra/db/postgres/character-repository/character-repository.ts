import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { LoadCharacterByNameRepository } from '@/data/protocols/db/character/load-character-by-name-repository'
import { LoadCharactersRepository } from '@/data/protocols/db/character/load-characters-repository'
import { CharacterModel } from '@/domain/models/character'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import Character from '../models/character'

export class CharacterPostgresRepository implements AddCharacterRepository, LoadCharacterByNameRepository, LoadCharactersRepository {
  async add (characterData: AddCharacterParams): Promise<CharacterModel> {
    const character = await Character.create(characterData)
    return character
  }

  async loadByName (character: string): Promise<CharacterModel> {
    const characterData = await Character.findOne({
      where: {
        name: character
      }
    })
    return characterData
  }

  async loadAll (): Promise<any> {
    const characters = await Character.findAll({ raw: true })
    return characters
  }
}
