import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { DeleteCharacterByIdRepository } from '@/data/protocols/db/character/delete-character-by-id-repository'
import { LoadCharacterByNameRepository } from '@/data/protocols/db/character/load-character-by-name-repository'
import { LoadCharactersRepository } from '@/data/protocols/db/character/load-characters-repository'
import { UpdateCharacterRepository } from '@/data/protocols/db/character/update-character-repository'
import { CharacterModel } from '@/domain/models/character'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import { UpdateCharacterParams } from '@/domain/usecases/character/update-character'
import Character from '../models/character'

export class CharacterPostgresRepository implements
AddCharacterRepository,
LoadCharacterByNameRepository,
LoadCharactersRepository,
DeleteCharacterByIdRepository,
UpdateCharacterRepository {
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

  async updateCharacter (data: UpdateCharacterParams): Promise<boolean> {
    const { characterId, name, level, status, priority } = data
    const character = await Character.update({ name, level, status, priority }, {
      where: {
        id: characterId
      }
    })
    console.log('akita', character[0])
    return !!character[0]
  }

  async deleteById (id: string): Promise<boolean> {
    const isValid = await Character.destroy({
      where: {
        id
      }
    })
    return !!isValid
  }
}
