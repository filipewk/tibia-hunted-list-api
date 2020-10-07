import { makeDbDeleteCharacter } from '@/main/factories/usecases/character/delete-character/db-delete-character-factory'
import { DeleteCharacterController } from '@/presentation/controllers/character/delete-character/delete-character-controller'
import { Controller } from '@/presentation/protocols'

export const makeDeleteCharacterController = (): Controller => {
  return new DeleteCharacterController(makeDbDeleteCharacter())
}
