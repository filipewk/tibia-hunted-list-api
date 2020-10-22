import { AddCharacterParams } from '@/domain/usecases/character/add-character'
import { CharacterModel } from '@/domain/models/character'
import Character from '@/infra/db/postgres/models/character'
import faker from 'faker'
import { UpdateCharacterParams } from '@/domain/usecases/character/update-character'

export const mockAddCharacterParams = (): AddCharacterParams => ({
  name: faker.internet.userName(),
  sex: 'male',
  vocation: 'Elite Knight',
  level: 100,
  world: 'Duna',
  residence: 'Thais',
  priority: 1,
  status: 'Premium Account'
})

export const mockUpdateCharacterParams = (): UpdateCharacterParams => ({
  characterId: '1',
  name: faker.internet.userName(),
  sex: 'male',
  vocation: 'Elite Knight',
  level: 100,
  world: 'Duna',
  residence: 'Thais',
  priority: 1,
  status: 'Premium Account'
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
  status: 'Premium Account'
})

export const mockCharacterModels = (): CharacterModel[] => {
  return [{
    id: faker.random.uuid(),
    name: faker.internet.userName(),
    sex: 'male',
    vocation: 'Elite Knight',
    level: 100,
    world: 'Duna',
    residence: 'Thais',
    priority: 1,
    status: 'Premium Account'
  }, {
    id: faker.random.uuid(),
    name: faker.internet.userName(),
    sex: 'male',
    vocation: 'Elite Knight',
    level: 100,
    world: 'Duna',
    residence: 'Thais',
    priority: 1,
    status: 'Premium Account'
  }]
}

export const makeCreateCharacter = async (name: string): Promise<CharacterModel> => {
  const character = await Character.create({
    name,
    sex: 'male',
    vocation: 'Elite Knight',
    level: 50,
    world: 'Duna',
    residence: 'Edron',
    priority: 1,
    status: 'Premium Account'
  })
  return character
}
