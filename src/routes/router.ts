import { Router } from 'express';
import ErrorHelper from '../helpers/ErrorHelper';

import { AuthRouter } from './auth/AuthRouter';
import { LocationRouter } from './locations/LocationRouter';
import { SystemRouter } from './systems/SystemRouter';
import { PlanetRouter } from './planets/PlanetRouter';
import { SpaceStationRouter } from './space-stations/SpaceStationRouter';
import { UserRouter } from './users/UserRouter';

export const router = Router();

router.use('/auth', AuthRouter);
router.use('/locations', LocationRouter);
router.use('/systems', SystemRouter);
router.use('/planets', PlanetRouter);
router.use('/space-stations', SpaceStationRouter);
router.use('/users', UserRouter);

router.use(ErrorHelper);
