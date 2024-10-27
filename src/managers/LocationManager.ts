import LocationModel, { ILocation } from '../models/Location/LocationModel';
import { BaseModelManager } from './BaseModelManager';

export class LocationManager extends BaseModelManager<typeof LocationModel, ILocation> {
  constructor() {
    super(LocationModel);
  }
}

export const Locations = new LocationManager();
