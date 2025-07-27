import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';  // Make sure this exists
import { apiLimiter, authLimiter } from './middleware/rateLimiter.middleware';
import investmentRoutes from './routes/investment.routes';
import portfolioRouter from './routes/portfolio.routes'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);  // This mounts your protected routes

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/portfolio', portfolioRouter);
// Initialize DB
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));


// Apply rate limiting
app.use(apiLimiter); // Global rate limit

// Stricter limits for auth routes
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);

export default app;