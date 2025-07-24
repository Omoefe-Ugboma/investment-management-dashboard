import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.register(email, password);
    res.json(tokens);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.json(tokens);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
};