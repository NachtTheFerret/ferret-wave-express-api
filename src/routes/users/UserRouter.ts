import { Router } from 'express';
import AsyncHelper from '../../helpers/AsyncHelper';
import Validate from '../../middlewares/Validate';
import { GetUsersQuerySchema, UpdateUserSchema } from './UserValidation';
import { UserController } from './UserController';

export const UserRouter = Router();

UserRouter.get('/', AsyncHelper(Validate(GetUsersQuerySchema, 'query')), AsyncHelper(UserController.getUsers));

UserRouter.get('/:userId', AsyncHelper(UserController.getUser));

UserRouter.patch('/:userId', AsyncHelper(Validate(UpdateUserSchema, 'body')), AsyncHelper(UserController.updateUser));

UserRouter.delete('/:userId', AsyncHelper(UserController.deleteUser));
