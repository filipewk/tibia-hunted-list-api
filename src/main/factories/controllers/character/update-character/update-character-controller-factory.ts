import { makeDbUpdateCharacter } from '@/main/factories/usecases/character/update-character/db-update-character-factory'
import { UpdateCharacterController } from '@/presentation/controllers/character/update-character/update-character-controller'
import { Controller } from '@/presentation/protocols'
import { CharacterValidatorApiAdapter } from '@/utils/character-validator-api-adapter'

export const makeUpdateCharacterController = (): Controller => {
  const characterValidatorApi = new CharacterValidatorApiAdapter()
  return new UpdateCharacterController(makeDbUpdateCharacter(), characterValidatorApi)
}
