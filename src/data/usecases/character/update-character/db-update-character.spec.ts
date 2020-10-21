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
    const updateSpy = jest.spyOn(updateCharacterRepositoryStub, 'updateChacater')
    await sut.update()
    expect(updateSpy).toHaveBeenCalled()
  })
})
