import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddCharacterController } from '../factories/controllers/character/character-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/characters', adaptRoute(makeAddCharacterController()))
}
