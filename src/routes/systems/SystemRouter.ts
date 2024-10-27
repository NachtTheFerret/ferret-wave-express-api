import { Router } from 'express';
import AsyncHelper from '../../helpers/AsyncHelper';
import Validate from '../../middlewares/Validate';
import { CreateSystemSchema, GetSystemsQuerySchema, UpdateSystemSchema } from './SystemValidation';
import { SystemController } from './SystemController';

export const SystemRouter = Router();

SystemRouter.get('/', AsyncHelper(Validate(GetSystemsQuerySchema, 'query')), AsyncHelper(SystemController.getSystems));

SystemRouter.post('/', AsyncHelper(Validate(CreateSystemSchema, 'body')), AsyncHelper(SystemController.createSystem));

SystemRouter.get('/:systemId', AsyncHelper(SystemController.getSystem));

SystemRouter.patch(
  '/:systemId',
  AsyncHelper(Validate(UpdateSystemSchema, 'body')),
  AsyncHelper(SystemController.updateSystem)
);

SystemRouter.delete('/:systemId', AsyncHelper(SystemController.deleteSystem));
