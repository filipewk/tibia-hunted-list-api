import { AddCharacter } from '@/domain/usecases/character/add-character'
import { CharacterPostgresRepository } from '@/infra/db/postgres/character-repository/character-repository'
import { DbAddCharacter } from '@/data/usecases/character/add-character/db-add-character'

export const makeDbAddCharacter = (): AddCharacter => {
  const characterPostegresRepository = new CharacterPostgresRepository()
  return new DbAddCharacter(characterPostegresRepository, characterPostegresRepository)
}
