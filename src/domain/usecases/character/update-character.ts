export type UpdateCharacterParams = {
  characterId: string
  name: string
  level: number
  status: string
  priority?: number
}

export interface UpdateCharacter {
  update: (data: UpdateCharacterParams) => Promise<boolean>
}
