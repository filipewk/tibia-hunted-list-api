import { CharacterValidator } from '@/presentation/protocols/character-validator'
import axios from 'axios'

export class CharacterValidatorApiAdapter implements CharacterValidator {
  async isValid (characterName: string): Promise<any> {
    const name = characterName
      .replace(' ', '+')
      .toLowerCase()
    const url = `https://api.tibiadata.com/v2/characters/${name}.json`
    const tibiaDataApi = await axios.get(url)
    if (!tibiaDataApi.data.characters.error) {
      console.log(tibiaDataApi.data)
      return tibiaDataApi.data
    }
    return false
  }
}
