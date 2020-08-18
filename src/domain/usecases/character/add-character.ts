import { CharacterModel } from '@/domain/models/character'

export type AddCharacterParams = Omit<CharacterModel, 'id'>

export interface AddCharacter {
  add: (addCharacterParam: AddCharacterParams) => Promise<CharacterModel>
}
