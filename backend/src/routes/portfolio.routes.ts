import { Router } from 'express';
import { getPortfolio } from '../portfolio/portfolio.controller';
import { checkPermission } from '../middleware/rbac.middleware';
import { PERMISSIONS } from '../auth/rbac.constants';

const router = Router();

// GET /api/portfolio
router.get('/', 
  checkPermission(PERMISSIONS.INVESTMENT_READ), 
  getPortfolio
);

export default router;