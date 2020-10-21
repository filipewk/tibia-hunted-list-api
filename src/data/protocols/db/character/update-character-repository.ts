import { UpdateCharacterParams } from '@/domain/usecases/character/update-character'

export interface UpdateCharacterRepository {
  updateChacater: (data: UpdateCharacterParams) => Promise<boolean>
}
