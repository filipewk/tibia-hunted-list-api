import { AddAccountModel } from '@/domain/models/account'
import faker from 'faker'

export const mockAccountModel = (): AddAccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
