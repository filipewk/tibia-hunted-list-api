import 'module-alias/register';
import env from './config/env';
import { sequelizeHelper } from '@/infra/db/postgres/helpers/sequelize-helper';
import createApp from './config/app';

async function initializeDatabase() {
  const sequelize = sequelizeHelper.connect(env.postgresUrl);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

async function initializeServer() {
  const app = await createApp();
  app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`);
  });
}

async function bootstrap() {
  await initializeDatabase();
  await initializeServer();
}

bootstrap().catch(error => {
  console.error('Error during initialization:', error);
  process.exit(1);
});
