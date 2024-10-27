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
import { PlanetModel } from './PlanetModel';
import { BaseModel, IBase } from './BaseModel_';

export interface ISpaceStation extends IBase {
  id: string;
  name: string;
  description: string;
  bannerUrl: string;

  systemId: string;
  planetId?: string | null;
}

@Table({ tableName: 'space_station' })
export class SpaceStationModel extends BaseModel implements ISpaceStation {
  @PrimaryKey
  @Default(() => UUID())
  @Column({ type: DataType.UUID })
  declare id: string;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare bannerUrl: string;

  @AllowNull(false)
  @ForeignKey(() => SystemModel)
  @Column({ type: DataType.UUID })
  declare systemId: string;

  @AllowNull(true)
  @ForeignKey(() => PlanetModel)
  @Column({ type: DataType.UUID })
  declare planetId: string | null;

  // # Relations
  @BelongsTo(() => SystemModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare system: SystemModel;

  @BelongsTo(() => PlanetModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare planet: PlanetModel;
}

export default SpaceStationModel;
