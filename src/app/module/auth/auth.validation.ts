import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email('This is not a valid email'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// const changePasswordValidationSchema = z.object({
//   body: z.object({
//     oldPassword: z.string({ required_error: 'Old Password is required' }),
//     newPassword: z.string({ required_error: 'New Password is required' }),
//   }),
// });

// const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh token is required!',
//     }),
//   }),
// });

export const AuthValidation = {
  loginValidationSchema,
  // changePasswordValidationSchema,
  // refreshTokenValidationSchema,
};
