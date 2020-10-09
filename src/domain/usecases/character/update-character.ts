export type UpdateCharacterParams = {
  characterId: string
  name: string
  level: string
  status: string
  priority?: number
}

export interface UpdateCharacter {
  update: (data: UpdateCharacterParams) => Promise<boolean>
}
