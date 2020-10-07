import { DbDeleteCharacter } from '@/data/usecases/character/delete-character/db-delete-character'
import { DeleteCharacter } from '@/domain/usecases/character/delete-character'
import { CharacterPostgresRepository } from '@/infra/db/postgres/character-repository/character-repository'

export const makeDbDeleteCharacter = (): DeleteCharacter => {
  const deletePostgresRepository = new CharacterPostgresRepository()
  return new DbDeleteCharacter(deletePostgresRepository)
}
