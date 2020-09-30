import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { CharacterModel } from '@/domain/models/character'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'

export const mockAddCharacterRepository = (): AddCharacterRepository => {
  class AddCharacterRepositoryStub implements AddCharacterRepository {
    async add (characterData: AddCharacterParams): Promise<CharacterModel> {
      return null
    }
  }
  return new AddCharacterRepositoryStub()
}
