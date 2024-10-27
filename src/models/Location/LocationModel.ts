import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { v4 as UUID } from 'uuid';
import { SystemModel } from '../SystemModel';
import { PlanetModel } from '../PlanetModel';
import { SpaceStationModel } from '../SpaceStationModel';
import { UserModel } from '../UserModel';
import { BaseModel, IBase } from '../BaseModel_';
import { LocationScopes } from './LocationScopes';

export type LocationTheme =
  | 'FAUNA'
  | 'FLORA'
  | 'MINERAL'
  | 'CAVE'
  | 'BASE'
  | 'OUTPOST'
  | 'RUIN'
  | 'CRASH'
  | 'PORTAL'
  | 'SPACE'
  | 'STATION'
  | 'UNKNOWN';

export type LocationStatus = 'OBSOLETE' | 'PENDING' | 'VERIFIED';

// TODO : Ajouté une table LocationCoordinate pour gérer les coordonnées d'une location (Oui il peut y avoir plusieurs coordonnées pour une location)
// TODO : Action : Ajouter un système de queue et enchairement d'actions
export type LocationType = 'NORMAL' | 'ACTION';

export interface ILocation extends IBase {
  name: string;
  description?: string | null;
  type: LocationType;
  theme: LocationTheme;
  subTheme: string;
  status: LocationStatus;

  systemId: string;
  planetId?: string | null;
  spaceStationId?: string | null;

  price?: number | null;

  discoveredBy?: string | null;
  discoveryDate?: Date | null;
  lastUpdatedBy?: string | null;
  lastUpdatedDate?: Date | null;
}

@Table({ tableName: 'location', scopes: LocationScopes })
export class LocationModel extends BaseModel implements ILocation {
  @PrimaryKey
  @Default(() => UUID())
  @Column({ type: DataType.UUID })
  declare id: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description: string | null;

  @AllowNull(false)
  @Default('NORMAL')
  @Column({ type: DataType.ENUM('NORMAL', 'ACTION') })
  declare type: LocationType;

  @AllowNull(false)
  @Default('UNKNOWN')
  @Column({
    type: DataType.ENUM(
      'FAUNA',
      'FLORA',
      'MINERAL',
      'CAVE',
      'BASE',
      'OUTPOST',
      'RUIN',
      'CRASH',
      'PORTAL',
      'SPACE',
      'STATION',
      'UNKNOWN'
    ),
  })
  declare theme: LocationTheme;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare subTheme: string;

  @AllowNull(false)
  @Default('PENDING')
  @Column({ type: DataType.ENUM('OBSOLETE', 'PENDING', 'VERIFIED') })
  declare status: LocationStatus;

  @AllowNull(false)
  @ForeignKey(() => SystemModel)
  @Column({ type: DataType.UUID })
  declare systemId: string;

  @AllowNull(true)
  @ForeignKey(() => PlanetModel)
  @Column({ type: DataType.UUID })
  declare planetId: string | null;

  @AllowNull(true)
  @ForeignKey(() => SpaceStationModel)
  @Column({ type: DataType.UUID })
  declare spaceStationId: string | null;

  @AllowNull(true)
  @Column({ type: DataType.DECIMAL(10, 2) })
  declare price: number | null;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  declare discoveredBy: string | null;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare discoveryDate: Date | null;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.STRING })
  declare lastUpdatedBy: string | null;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare lastUpdatedDate: Date | null;

  // # Relations
  @BelongsTo(() => SystemModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  declare system: SystemModel;

  @BelongsTo(() => PlanetModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  declare planet: PlanetModel | null;

  @BelongsTo(() => SpaceStationModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  declare spaceStation: SpaceStationModel | null;

  @BelongsTo(() => UserModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE', foreignKey: 'discovered_by' })
  declare discoverer: UserModel | null;

  @BelongsTo(() => UserModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE', foreignKey: 'last_updated_by' })
  declare updater: UserModel | null;
}

export default LocationModel;
