import SpaceStationModel, { ISpaceStation } from '../models/SpaceStationModel';
import { BaseModelManager } from './BaseModelManager';

export class SpaceStationManager extends BaseModelManager<typeof SpaceStationModel, ISpaceStation> {
  constructor() {
    super(SpaceStationModel);
  }
}

export const SpaceStations = new SpaceStationManager();
