import { Router } from 'express';
import { userController } from './user.controller';
import validationMiddleware from '../../Middleware/validationMiddleware';
import { zodCustomerSchema } from '../Customers/customer.zodValidation';

import { zodAdminSchema } from '../Admin/admin.zodValidation';

const router = Router();

router.post(
  '/signup',
  validationMiddleware(zodCustomerSchema),
  userController.createCustomer,
);
router.post(
  '/create-admin',
  validationMiddleware(zodAdminSchema),
  userController.createAdmin,
);

export const UserRouter = router;
