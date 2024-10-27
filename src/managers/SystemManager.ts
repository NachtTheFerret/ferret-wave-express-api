import SystemModel, { ISystem } from '../models/SystemModel';
import { BaseModelManager } from './BaseModelManager';

export class SystemManager extends BaseModelManager<typeof SystemModel, ISystem> {
  constructor() {
    super(SystemModel);
  }
}

export const Systems = new SystemManager();
