import { Model } from 'sequelize-typescript';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBase {}

export class BaseModel extends Model implements IBase {}
