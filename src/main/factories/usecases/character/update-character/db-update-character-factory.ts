import { DbUpdateCharacter } from '@/data/usecases/character/update-character/db-update-character'
import { UpdateCharacter } from '@/domain/usecases/character/update-character'
import { CharacterPostgresRepository } from '@/infra/db/postgres/character-repository/character-repository'

export const makeDbUpdateCharacter = (): UpdateCharacter => {
  const updatePostgresRepository = new CharacterPostgresRepository()
  return new DbUpdateCharacter(updatePostgresRepository)
}
