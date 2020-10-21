import { UpdateCharacterRepository } from '@/data/protocols/db/character/update-character-repository'
import { UpdateCharacter, UpdateCharacterParams } from '@/domain/usecases/character/update-character'

export class DbUpdateCharacter implements UpdateCharacter {
  constructor (
    private readonly updateCharacterRepository: UpdateCharacterRepository
  ) {}

  async update (data: UpdateCharacterParams): Promise<boolean> {
    await this.updateCharacterRepository.updateChacater(data)
    return true
  }
}
