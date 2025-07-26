import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../models/user.entity';
import { Investment } from '../investments/investment.model';
import { CryptoInvestment } from '../investments/types/crypto.dto';
import { MutualFundInvestment } from '../investments/types/mutual-fund.dto';
import { StockInvestment } from '../investments/types/stock.dto';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // Make sure this matches your .env
  entities: [
    User,
    Investment,
    StockInvestment,
    CryptoInvestment,
    MutualFundInvestment,
  ],
  synchronize: true,
  logging: false,
});

