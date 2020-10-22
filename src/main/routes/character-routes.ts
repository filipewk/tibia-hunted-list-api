import {
  makeAddCharacterController,
  makeLoadCharactersController,
  makeDeleteCharacterController,
  makeUpdateCharacterController
} from '../factories/controllers/character'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/characters', adaptRoute(makeLoadCharactersController()))
  router.post('/characters', adaptRoute(makeAddCharacterController()))
  router.put('/character/:characterId', adaptRoute(makeUpdateCharacterController()))
  router.delete('/character/:characterId', adaptRoute(makeDeleteCharacterController()))
}
