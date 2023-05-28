import { SequelizeOptions } from 'sequelize-typescript';

const databaseConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
};

export default databaseConfig;
