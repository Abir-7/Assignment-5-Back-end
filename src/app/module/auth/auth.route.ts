import { Router } from 'express';
import { AuthController } from './auth.controller';
import validationMiddleware from '../../Middleware/validationMiddleware';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validationMiddleware(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRouter = router;
