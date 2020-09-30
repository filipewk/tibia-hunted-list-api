import { CharacterModel } from '@/domain/models/character'

export interface LoadCharacterByNameRepository {
  loadByName: (character: string) => Promise<CharacterModel>
}
