import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import Character from '../models/character'
import axios from 'axios'

export class CharacterPostgresRepository implements AddCharacterRepository {
  async add (characterData: AddCharacterParams): Promise<void> {
    const characterName = characterData.name
      .replace(' ', '+')
      .toLowerCase()
    const url = `https://api.tibiadata.com/v2/characters/${characterName}.json`
    const tibiaDataApi = await axios.get(url)
    if (tibiaDataApi.data.characters.error) {
      throw new Error('Character does not exist.')
    }
    await Character.create(characterData)
  }
}
