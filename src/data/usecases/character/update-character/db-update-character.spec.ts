import { UpdateCharacterRepositorySpy } from '@/data/test/mocks'
import { DbUpdateCharacter } from './db-update-character'

const makeSut = (): any => {
  const updateCharacterRepositoryStub = new UpdateCharacterRepositorySpy()
  const sut = new DbUpdateCharacter(updateCharacterRepositoryStub)
  return {
    sut,
    updateCharacterRepositoryStub
  }
}

describe('DbUpdateCharacter Usecase', () => {
  test('Should call LoadCharactersRepository with correct values', async () => {
    const { sut, updateCharacterRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCharacterRepositoryStub, 'updateCharacter')
    await sut.update({})
    expect(updateSpy).toHaveBeenCalled()
  })

  test('Should DbUpdateCharacter return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.update('any_data')
    expect(isValid).toBe(true)
  })

  test('Should DbUpdateCharacter return false when updateCharacterRepository fails', async () => {
    const { sut, updateCharacterRepositoryStub } = makeSut()
    jest.spyOn(updateCharacterRepositoryStub, 'updateCharacter').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.update('wrong_data')
    expect(isValid).toBe(false)
  })

  test('Should throw if UpdateCharacterRepository throws', async () => {
    const { sut, updateCharacterRepositoryStub } = makeSut()
    jest.spyOn(updateCharacterRepositoryStub, 'updateCharacter').mockRejectedValueOnce(new Error())
    const promise = sut.update('any_data')
    await expect(promise).rejects.toThrow()
  })
})
