import { DbLoadCharacters } from '@/data/usecases/character/load-characters/db-load-characters'
import { LoadCharacters } from '@/domain/usecases/character/load-characters'
import { CharacterPostgresRepository } from '@/infra/db/postgres/character-repository/character-repository'

export const makeDbLoadCharacters = (): LoadCharacters => {
  const characterPostgresRepository = new CharacterPostgresRepository()
  return new DbLoadCharacters(characterPostgresRepository)
}
