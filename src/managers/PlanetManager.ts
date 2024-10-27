import PlanetModel, { IPlanet } from '../models/PlanetModel';
import { BaseModelManager } from './BaseModelManager';

export class PlanetManager extends BaseModelManager<typeof PlanetModel, IPlanet> {
  constructor() {
    super(PlanetModel);
  }
}

export const Planets = new PlanetManager();
