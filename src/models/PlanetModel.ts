import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { v4 as UUID } from 'uuid';
import { SystemModel } from './SystemModel';
import { BaseModel, IBase } from './BaseModel_';

export interface IPlanet extends IBase {
  id: string;
  name: string;
  description: string;

  systemId: string;

  latitude: number;
  longitude: number;
}

@Table({ tableName: 'planet' })
export class PlanetModel extends BaseModel implements IPlanet {
  @PrimaryKey
  @Default(() => UUID())
  @Column({ type: DataType.UUID })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description: string;

  @AllowNull(false)
  @ForeignKey(() => SystemModel)
  @Column({ type: DataType.UUID })
  declare systemId: string;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10, 8) })
  declare latitude: number;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(11, 8) })
  declare longitude: number;

  // # Relations
  @BelongsTo(() => SystemModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare system: SystemModel;
}

export default PlanetModel;
