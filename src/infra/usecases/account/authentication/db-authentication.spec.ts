import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepositorySpy } from '@/data/test/mocks'
import { mockAuthenticationParams } from '@/domain/test/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepository: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepository)
  return {
    sut,
    loadAccountByEmailRepository
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepository.email).toBe(authenticationParams.email)
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    const { sut } = makeSut()
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })
})
