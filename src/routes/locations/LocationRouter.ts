import AsyncHelper from '../../helpers/AsyncHelper';
import { Router } from 'express';
import { LocationController } from './LocationController';
import Validate from '../../middlewares/Validate';
import { CreateLocationSchema, GetLocationsQuerySchema, UpdateLocationSchema } from './LocationValidation';

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

LocationRouter.get('/:locationId', AsyncHelper(LocationController.getLocation));

LocationRouter.patch(
  '/:locationId',
  AsyncHelper(Validate(UpdateLocationSchema, 'body')),
  AsyncHelper(LocationController.updateLocation)
);

LocationRouter.delete('/:locationId', AsyncHelper(LocationController.deleteLocation));
