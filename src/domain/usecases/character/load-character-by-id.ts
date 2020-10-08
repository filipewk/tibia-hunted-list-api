import { CharacterModel } from '@/domain/models/character'

export interface LoadCharacterById {
  load: (id: string) => Promise<CharacterModel>
}
