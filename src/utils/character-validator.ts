import { CharacterValidator } from '@/presentation/protocols/character-validator'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import axios from 'axios'

export class CharacterValidatorAdapter implements CharacterValidator {
  async isValid (characterData: AddCharacterParams): Promise<boolean> {
    const characterName = characterData.name
      .replace(' ', '+')
      .toLowerCase()
    const url = `https://api.tibiadata.com/v2/characters/${characterName}.json`
    const tibiaDataApi = await axios.get(url)
    return !tibiaDataApi.data.characters.error
  }
}
