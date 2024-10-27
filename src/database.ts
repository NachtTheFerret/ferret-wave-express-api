import { Sequelize } from 'sequelize-typescript';
import { variables } from './dotenv';

export const sequelize = new Sequelize({
  database: variables.DATABASE_NAME,
  dialect: 'postgres',
  username: variables.DATABASE_USERNAME,
  password: variables.DATABASE_PASSWORD,
  host: variables.DATABASE_HOST,
  port: Number(variables.DATABASE_PORT),
  models: [__dirname + '/models/**/*Model.ts'],

  define: {
    underscored: true,
    timestamps: true,
  },

  logging: false,
});
