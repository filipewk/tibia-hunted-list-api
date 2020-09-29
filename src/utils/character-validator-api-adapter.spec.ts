import { CharacterValidatorApiAdapter } from './character-validator-api-adapter'
import { mockAddCharacterParams } from '@/domain/test/mocks/character'

const makeSut = (): CharacterValidatorApiAdapter => {
  const sut = new CharacterValidatorApiAdapter()
  return sut
}

describe('CharacterValidator Adapter', () => {
  test('Should return false if character does not exist', async () => {
    const sut = makeSut()
    const character = mockAddCharacterParams()
    character.name = 'ff'
    const isValid = await sut.isValid(character.name)
    expect(isValid).toBe(false)
  })

  test('Should return character data if character exist', async () => {
    const sut = makeSut()
    const character = mockAddCharacterParams()
    character.name = 'On Rails'
    const isValid = await sut.isValid(character.name)
    expect(isValid).toBeTruthy()
  })
})
