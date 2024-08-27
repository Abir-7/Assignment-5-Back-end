import { RequestHandler } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthService.userLogin(loginData);

  return res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: { user: result.user, token: result.accessToken },
  });
});

export const AuthController = {
  loginUser,
};
