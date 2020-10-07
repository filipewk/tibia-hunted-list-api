import { makeAddCharacterController } from '../factories/controllers/character/add-character/add-character-controller-factory'
import { makeLoadCharactersController } from '../factories/controllers/character/load-characters/load-characters-controller-factory'
import { makeDeleteCharacterController } from '../factories/controllers/character/delete-character/delete-characters-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/characters', adaptRoute(makeAddCharacterController()))
  router.get('/characters', adaptRoute(makeLoadCharactersController()))
  router.delete('/character/:characterId', adaptRoute(makeDeleteCharacterController()))
}
