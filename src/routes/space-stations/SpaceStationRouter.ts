import { Router } from 'express';
import AsyncHelper from '../../helpers/AsyncHelper';
import Validate from '../../middlewares/Validate';
import {
  CreateSpaceStationSchema,
  GetSpaceStationsQuerySchema,
  UpdateSpaceStationSchema,
} from './SpaceStationValidation';
import { SpaceStationController } from './SpaceStationController';

export const SpaceStationRouter = Router();

SpaceStationRouter.get(
  '/',
  AsyncHelper(Validate(GetSpaceStationsQuerySchema, 'query')),
  AsyncHelper(SpaceStationController.getSpaceStations)
);

SpaceStationRouter.post(
  '/',
  AsyncHelper(Validate(CreateSpaceStationSchema, 'body')),
  AsyncHelper(SpaceStationController.createSpaceStation)
);

SpaceStationRouter.get('/:spaceStationId', AsyncHelper(SpaceStationController.getSpaceStation));

SpaceStationRouter.patch(
  '/:spaceStationId',
  AsyncHelper(Validate(UpdateSpaceStationSchema, 'body')),
  AsyncHelper(SpaceStationController.updateSpaceStation)
);

SpaceStationRouter.delete('/:spaceStationId', AsyncHelper(SpaceStationController.deleteSpaceStation));
