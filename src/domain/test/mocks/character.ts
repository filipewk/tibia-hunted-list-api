import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import { CharacterModel } from '@/domain/models/character'
import faker from 'faker'

export const mockAddCharacterParams = (): AddCharacterParams => ({
  name: faker.internet.userName(),
  sex: 'male',
  vocation: 'Elite Knight',
  level: 100,
  world: 'Duna',
  residence: 'Thais',
  priority: 1,
  status: 'hunted'

})

export const mockCharacterModel = (): CharacterModel => ({
  id: faker.random.uuid(),
  name: faker.internet.userName(),
  sex: 'male',
  vocation: 'Elite Knight',
  level: 100,
  world: 'Duna',
  residence: 'Thais',
  priority: 1,
  status: 'hunted'
})
