import { Controller } from '@/presentation/protocols'
import { AddCharacterController } from '@/presentation/controllers/character/add-character/add-character-controller'
import { makeDbAddCharacter } from '../../usecases/character/add-character/db-add-character-factory'
import { CharacterValidatorApiAdapter } from '@/utils/character-validator-api-adapter'

export const makeAddCharacterController = (): Controller => {
  const characterValidatorApi = new CharacterValidatorApiAdapter()
  return new AddCharacterController(makeDbAddCharacter(), characterValidatorApi)
}
