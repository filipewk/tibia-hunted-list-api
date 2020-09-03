import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'

export class DbAddCharacter implements AddCharacterRepository {
  constructor (
    private readonly addCharacterRepository: AddCharacterRepository
  ) {}

  async add (characterData: AddCharacterParams): Promise<void> {
    await this.addCharacterRepository.add(characterData)
  }
}
