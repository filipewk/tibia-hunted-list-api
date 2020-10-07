import { DeleteCharacterByIdRepository } from '@/data/protocols/db/character/delete-character-by-id-repository'
import { DeleteCharacter } from '@/domain/usecases/character/delete-character'

export class DbDeleteCharacter implements DeleteCharacter {
  constructor (private readonly deleteCharacterByIdRepository: DeleteCharacterByIdRepository) {}

  async remove (id: string): Promise<boolean> {
    const isDeleted = await this.deleteCharacterByIdRepository.deleteById(id)
    return isDeleted
  }
}
