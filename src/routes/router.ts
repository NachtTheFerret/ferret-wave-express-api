import { Router } from 'express';
import ErrorHelper from '../helpers/ErrorHelper';

import { LocationRouter } from './locations/LocationRouter';
import { SystemRouter } from './systems/SystemRouter';

export const router = Router();

router.use('/locations', LocationRouter);
router.use('/systems', SystemRouter);

router.use(ErrorHelper);
