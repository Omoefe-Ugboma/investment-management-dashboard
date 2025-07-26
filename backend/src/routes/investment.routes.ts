import { Router } from 'express';
import { 
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
} from '../investments/investment.controller';
// import { authenticateJWT } from '../auth/auth.middleware';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createInvestment);
router.get('/', authenticateJWT, getInvestments);
router.put('/:id', authenticateJWT, updateInvestment);
router.delete('/:id', authenticateJWT, deleteInvestment);

export default router;