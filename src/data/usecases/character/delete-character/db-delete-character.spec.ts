import { DeleteByIdRepositorySpy } from '@/data/test/mocks'
import { DbDeleteCharacter } from './db-delete-character'

const makeSut = (): any => {
  const deleteCharacterRepositoryStub = new DeleteByIdRepositorySpy()
  const sut = new DbDeleteCharacter(deleteCharacterRepositoryStub)
  return {
    sut,
    deleteCharacterRepositoryStub
  }
}

describe('DbDeleteCharacter UseCase', () => {
  test('Should call DeleteCharacterRepository with correct id', async () => {
    const { sut, deleteCharacterRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteCharacterRepositoryStub, 'deleteById')
    await sut.remove('any_id')
    expect(deleteSpy).toHaveBeenCalledWith(deleteCharacterRepositoryStub.characterId)
  })
})
