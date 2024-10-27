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
  description?: string | null;
  bannerUrl?: string | null;

  systemId: string;
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

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare bannerUrl: string | null;

  @AllowNull(false)
  @ForeignKey(() => SystemModel)
  @Column({ type: DataType.UUID })
  declare systemId: string;

  // # Relations
  @BelongsTo(() => SystemModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare system: SystemModel;
}

export default PlanetModel;
