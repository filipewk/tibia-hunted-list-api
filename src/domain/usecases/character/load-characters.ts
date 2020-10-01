import { CharacterModel } from '@/domain/models/character'

export interface LoadCharacters {
  load: () => Promise<CharacterModel>
}
