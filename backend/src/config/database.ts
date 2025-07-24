import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../models/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // Make sure this matches your .env
  entities: [User],
  synchronize: true,
  logging: false,
});