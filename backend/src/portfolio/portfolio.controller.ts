import { Request, Response } from 'express';
import { PortfolioService } from './portfolio.service';
import { isErrorWithMessage } from '../utils/error.util';
import { NotFoundException } from '../exceptions/not-found.exception';

const portfolioService = new PortfolioService();

export const getPortfolio = async (req: Request, res: Response) => {
  try {
    // Use req.user.userId instead of req.user.id to match JwtPayload
    if (!req.user?.id) {
      throw new NotFoundException('User not found');
    }

    const summary = await portfolioService.getPortfolioSummary(req.user.id);
    res.json(summary);
  } catch (error: unknown) {
    if (error instanceof NotFoundException) {
      return res.status(404).json({ error: error.message });
    }
    
    const errorMessage = isErrorWithMessage(error) ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
};