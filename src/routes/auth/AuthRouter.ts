import { Router } from 'express';
import AsyncHelper from '../../helpers/AsyncHelper';
import Validate from '../../middlewares/Validate';
import { loginWithDiscordSchema } from './AuthValidation';
import { AuthController } from './AuthController';

export const AuthRouter = Router();

AuthRouter.post(
  '/discord/login',
  AsyncHelper(Validate(loginWithDiscordSchema, 'body')),
  AsyncHelper(AuthController.loginWithDiscord)
);

AuthRouter.post('/logout', AsyncHelper(AuthController.logout));

AuthRouter.post('/refresh', AsyncHelper(AuthController.refresh));
