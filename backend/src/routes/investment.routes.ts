import { Router } from 'express';
import { 
  createInvestment,
  getInvestments,
  getInvestmentById,  // Make sure this is imported
  updateInvestment,
  deleteInvestment
} from '../investments/investment.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createInvestment);
router.get('/', authenticateJWT, getInvestments);
// Add this line for the GET by ID endpoint:
router.get('/:id', authenticateJWT, getInvestmentById);
router.put('/:id', authenticateJWT, updateInvestment);
router.delete('/:id', authenticateJWT, deleteInvestment);

export default router;