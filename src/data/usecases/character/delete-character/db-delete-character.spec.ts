import { DeleteByIdRepositorySpy } from '@/data/test/mocks'
import { DbDeleteCharacter } from './db-delete-character'

type SutTypes = {
  sut: DbDeleteCharacter
  deleteCharacterRepositoryStub: DeleteByIdRepositorySpy
}

const makeSut = (): SutTypes => {
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

  test('Should DbDeleteCharacter return true on success', async () => {
    const { sut } = makeSut()
    const isDeleted = await sut.remove('any_id')
    expect(isDeleted).toBe(true)
  })

  test('Should throw if DeleteCharacterRepository throws', async () => {
    const { sut, deleteCharacterRepositoryStub } = makeSut()
    jest.spyOn(deleteCharacterRepositoryStub, 'deleteById').mockRejectedValueOnce(new Error())
    const promise = sut.remove('any_id')
    await expect(promise).rejects.toThrow()
  })
})

// TODO test return true or false
