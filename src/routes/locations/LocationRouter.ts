import AsyncHelper from '../../helpers/AsyncHelper';
import { Router } from 'express';
import { LocationController } from './LocationController';
import Validate from '../../middlewares/Validate';
import { CreateLocationSchema, GetLocationsQuerySchema } from './LocationValidation';

export const LocationRouter = Router();

LocationRouter.get(
  '/',
  AsyncHelper(Validate(GetLocationsQuerySchema, 'query')),
  AsyncHelper(LocationController.getLocations)
);

LocationRouter.post(
  '/',
  AsyncHelper(Validate(CreateLocationSchema, 'body')),
  AsyncHelper(LocationController.createLocation)
);
