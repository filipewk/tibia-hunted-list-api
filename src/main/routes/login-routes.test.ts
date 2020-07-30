import app from '@/main/config/app'
import User from '@/infra/db/postgres/models/user'
import { SequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import request from 'supertest'

describe('SignUp Routes', () => {
  beforeAll(() => {
    SequelizeHelper.connect()
  })

  afterAll(() => {
    SequelizeHelper.disconnect()
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
