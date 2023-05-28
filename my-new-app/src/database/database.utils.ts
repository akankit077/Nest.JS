import { Sequelize } from 'sequelize-typescript';
import databaseConfig from './database.config';

export const checkDatabaseConnection = async (): Promise<void> => {
  const sequelize = new Sequelize(databaseConfig);

  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.',
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};
