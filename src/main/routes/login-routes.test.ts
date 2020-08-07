import app from '@/main/config/app'
import env from '@/main/config/env'
import User from '@/infra/db/postgres/models/user'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'
import { hash } from 'bcrypt'
import request from 'supertest'

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

  describe('POST /signup', () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123456', 12)
      await User.create({
        name: 'Filipe',
        email: 'filipewk@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'filipewk@gmail.com',
          password: '123456'
        })
        .expect(200)
    })
  })
})
