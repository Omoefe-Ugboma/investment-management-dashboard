import { Request, Response } from 'express';
import { InvestmentService } from './investment.service';
import { AppError } from '../errors/app-error';

const investmentService = new InvestmentService();

export const createInvestment = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {  // Changed back to 'id' to match our type definition
      throw new AppError('Unauthorized', 401);
    }

    const investment = await investmentService.create(req.body, req.user.id);
    res.status(201).json(investment);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const getInvestments = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    const investments = await investmentService.findAll(req.user.id);
    res.json(investments);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const updateInvestment = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    const { id } = req.params;
    if (!id) {
      throw new AppError('Investment ID is required', 400);
    }

    const updatedInvestment = await investmentService.update(
      id,
      req.body,
      req.user.id
    );
    
    if (!updatedInvestment) {
      throw new AppError('Investment not found', 404);
    }
    
    res.json(updatedInvestment);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const deleteInvestment = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      throw new AppError('Unauthorized', 401);
    }

    const { id } = req.params;
    if (!id) {
      throw new AppError('Investment ID is required', 400);
    }

    const deleted = await investmentService.delete(id, req.user.id);
    
    if (deleted!) {  // Fixed the negation syntax here
      throw new AppError('Investment not found', 404);
    }
    
    res.status(204).send();
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

function handleErrorResponse(error: unknown, res: Response) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  
  console.error('Unexpected error:', error);
  res.status(500).json({ error: 'Internal server error' });
}