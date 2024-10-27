import { Router } from 'express';
import AsyncHelper from '../../helpers/AsyncHelper';
import Validate from '../../middlewares/Validate';
import { CreatePlanetSchema, GetPlanetsQuerySchema, UpdatePlanetSchema } from './PlanetValidation';
import { PlanetController } from './PlanetController';

export const PlanetRouter = Router();

PlanetRouter.get('/', AsyncHelper(Validate(GetPlanetsQuerySchema, 'query')), AsyncHelper(PlanetController.getPlanets));

PlanetRouter.post('/', AsyncHelper(Validate(CreatePlanetSchema, 'body')), AsyncHelper(PlanetController.createPlanet));

PlanetRouter.get('/:planetId', AsyncHelper(PlanetController.getPlanet));

PlanetRouter.patch(
  '/:planetId',
  AsyncHelper(Validate(UpdatePlanetSchema, 'body')),
  AsyncHelper(PlanetController.updatePlanet)
);

PlanetRouter.delete('/:planetId', AsyncHelper(PlanetController.deletePlanet));
