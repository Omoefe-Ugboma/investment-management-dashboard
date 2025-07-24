import { Router } from 'express';
import { checkPermission } from '../middleware/rbac.middleware';
import { PERMISSIONS } from '../auth/rbac.constants';

const router = Router();

router.get(
  '/demo',
  checkPermission(PERMISSIONS.USER_READ),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    res.json({ 
      message: 'You successfully accessed a protected route!',
      user: {
        id: req.user.id,
        email: req.user.email
      }
    });
  }
);

export default router;