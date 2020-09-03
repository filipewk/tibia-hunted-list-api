import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'
import { AddCharacterParams } from '@/domain/usecases/character/add-character'

export const mockAddCharacterRepository = (): AddCharacterRepository => {
  class AddCharacterRepositoryStub implements AddCharacterRepository {
    async add (characterData: AddCharacterParams): Promise<void> {
      return null
    }
  }
  return new AddCharacterRepositoryStub()
}
