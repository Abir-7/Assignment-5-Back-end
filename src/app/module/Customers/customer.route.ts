import { Router } from 'express';

import { customerController } from './customer.controller';
import { auth } from '../../Middleware/auth';

const router = Router();

router.patch('/:email', customerController.updateCustomer);
router.get('/me', auth('admin', 'user'), customerController.getCustomerInfo);

export const customerRoute = router;
