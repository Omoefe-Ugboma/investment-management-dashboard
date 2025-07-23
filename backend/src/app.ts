import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Initialize DB
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((err: any) => console.error('Database connection error:', err));

export default app;