import { CharacterValidator } from '@/presentation/protocols/character-validator'
import axios from 'axios'

export class CharacterValidatorApiAdapter implements CharacterValidator {
  async isValid (characterName: string): Promise<boolean> {
    const name = characterName
      .replace(' ', '+')
      .toLowerCase()
    const url = `https://api.tibiadata.com/v2/characters/${name}.json`
    const tibiaDataApi = await axios.get(url)
    return !tibiaDataApi.data.characters.error
    // TODO fazer retornar todos os dados validados
  }
}
