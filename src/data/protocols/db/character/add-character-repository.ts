import { AddCharacterParams } from '@/domain/usecases/character/add-character'

export interface AddCharacterRepository {
  add: (characterData: AddCharacterParams) => Promise<void>
}
