import { DeleteCharacterByIdRepository } from '@/data/protocols/db/character/delete-character-by-id-repository'
import { DeleteCharacter } from '@/domain/usecases/character/delete-character'

export class DbDeleteCharacter implements DeleteCharacter {
  constructor (private readonly deleteCharacterById: DeleteCharacterByIdRepository) {}

  async remove (id: string): Promise<void> {
    await this.deleteCharacterById.deleteById(id)
  }
}
