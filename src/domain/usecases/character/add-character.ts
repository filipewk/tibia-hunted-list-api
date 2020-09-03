import { CharacterModel } from '@/domain/models/character'

export type AddCharacterParams = Omit<CharacterModel, 'id'>

export interface AddCharacter {
  add: (character: AddCharacterParams) => Promise<void>
}
