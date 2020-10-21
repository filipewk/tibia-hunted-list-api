import { UpdateCharacterParams } from '@/domain/usecases/character/update-character'

export interface UpdateCharacterRepository {
  updateCharacter: (data: UpdateCharacterParams) => Promise<boolean>
}
