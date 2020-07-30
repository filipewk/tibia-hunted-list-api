import 'module-alias/register'
import env from './config/env'
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper'

const sequelize = sequelizeHelper.connect(env.postgresUrl)
sequelize.authenticate()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
  })
  .catch(console.error)
