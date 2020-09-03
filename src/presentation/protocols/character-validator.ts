import { AddCharacterParams } from '@/domain/usecases/character/add-character'

export interface CharacterValidator {
  isValid: (characterData: AddCharacterParams) => Promise<boolean>
}
