import { CharacterValidatorAdapter } from './character-validator'
import { mockAddCharacterParams } from '@/domain/test/mocks/character'

const makeSut = (): CharacterValidatorAdapter => {
  const sut = new CharacterValidatorAdapter()
  return sut
}

describe('CharacterValidator Adapter', () => {
  test('Should return false if character does not exist', async () => {
    const sut = makeSut()
    const character = mockAddCharacterParams()
    character.name = 'ff'
    const isValid = await sut.isValid(character)
    expect(isValid).toBe(false)
  })
})
