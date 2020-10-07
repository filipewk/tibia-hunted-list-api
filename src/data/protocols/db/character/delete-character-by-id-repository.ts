export interface DeleteCharacterByIdRepository {
  deleteById: (id: string) => Promise<void>
}
