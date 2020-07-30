import app from '@/main/config/app'
import User from '@/infra/db/postgres/models/user'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import request from 'supertest'
import env from '@/main/config/env'

describe('SignUp Routes', () => {
  beforeAll(() => {
    sequelizeHelper.connect(env.postgresUrl)
  })

  afterAll(async () => {
    await sequelizeHelper.disconnect()
  })

  beforeEach(async () => {
    await User.destroy({ truncate: true })
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Filipe',
        email: 'filipewk@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
