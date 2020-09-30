import { AddCharacter } from '@/domain/usecases/character/add-character'
import { CharacterPostgresRepository } from '@/infra/db/postgres/character-repository/character-postgres-repository'
import { DbAddCharacter } from '@/data/usecases/character/db-add-character'

export const makeDbAddCharacter = (): AddCharacter => {
  const characterPostegresRepository = new CharacterPostgresRepository()
  return new DbAddCharacter(characterPostegresRepository, characterPostegresRepository)
}
