export type UpdateCharacterParams = {
  characterId: string
  name: string
  sex: string
  vocation: string
  level: number
  world: string
  residence: string
  status: string
  priority?: number
}

export interface UpdateCharacter {
  update: (data: UpdateCharacterParams) => Promise<boolean>
}
