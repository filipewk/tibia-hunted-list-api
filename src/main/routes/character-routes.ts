import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddCharacterController } from '../factories/controllers/character/add-character/add-character-controller-factory'
import { Router } from 'express'
import { makeLoadCharactersController } from '../factories/controllers/character/load-characters/load-characters-controller-factory'

export default (router: Router): void => {
  router.post('/characters', adaptRoute(makeAddCharacterController()))
  router.get('/characters', adaptRoute(makeLoadCharactersController()))
}
