import { AddCharacterParams, AddCharacter } from '@/domain/usecases/character/add-character'
import { AddCharacterRepository } from '@/data/protocols/db/character/add-character-repository'

export class DbAddCharacter implements AddCharacter {
  constructor (
    private readonly addCharacterRepository: AddCharacterRepository
  ) {}

  async add (character: AddCharacterParams): Promise<void> {
    await this.addCharacterRepository.add(character)
  }
}
