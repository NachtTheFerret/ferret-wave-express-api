import { Router } from 'express';
import ErrorHelper from '../helpers/ErrorHelper';

import { LocationRouter } from './locations/LocationRouter';
import { SystemRouter } from './systems/SystemRouter';
import { PlanetRouter } from './planets/PlanetRouter';
import { SpaceStationRouter } from './space-stations/SpaceStationRouter';
import { UserRouter } from './users/UserRouter';

export const router = Router();

router.use('/locations', LocationRouter);
router.use('/systems', SystemRouter);
router.use('/planets', PlanetRouter);
router.use('/space-stations', SpaceStationRouter);
router.use('/users', UserRouter);

router.use(ErrorHelper);
