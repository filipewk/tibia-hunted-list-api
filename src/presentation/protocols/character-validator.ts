export interface CharacterValidator {
  isValid: (characterName: string) => Promise<any>
}
