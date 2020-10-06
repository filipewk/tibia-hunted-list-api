import { CharacterModel } from '@/domain/models/character'

export interface LoadCharactersRepository {
  loadAll: () => Promise<CharacterModel[]>
}
