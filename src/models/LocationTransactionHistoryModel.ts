import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { v4 as UUID } from 'uuid';
import { LocationModel } from './Location/LocationModel';
import { UserModel } from './UserModel';
import { BaseModel, IBase } from './BaseModel_';

export type LocationTransactionHistoryStatus = 'UNPAID' | 'PAID' | 'REFUNDED';
export type LocationTransactionHistoryParticipationStatus = 'PENDING' | 'NO_NEED' | 'PARTICIPATED';

export interface ILocationTransactionHistory extends IBase {
  id: string;
  price?: number | null;
  version: string;
  status: LocationTransactionHistoryStatus;

  // Indique si l'utilisateur qui a effectué la transaction a donné le pourcentage de participation à l'organisation
  // TODO : Faire un sytème pour gérer ça
  participationStatus: LocationTransactionHistoryParticipationStatus;

  locationId: string;
  userId: string;

  managedBy: string;
  paidAt?: Date | null;
  refundedAt?: Date | null;
}

@Table({ tableName: 'location_transaction_history' })
export class LocationTransactionHistoryModel extends BaseModel implements ILocationTransactionHistory {
  @PrimaryKey
  @Default(() => UUID())
  @Column({ type: DataType.UUID })
  declare id: string;

  @AllowNull(true)
  @Column({ type: DataType.DECIMAL(10, 2) })
  declare price: number | null;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare version: string;

  @AllowNull(false)
  @Default('UNPAID')
  @Column({ type: DataType.ENUM('UNPAID', 'PAID', 'REFUNDED') })
  declare status: LocationTransactionHistoryStatus;

  @AllowNull(false)
  @Default('PENDING')
  @Column({ type: DataType.ENUM('PENDING', 'NO_NEED', 'PARTICIPATED') })
  declare participationStatus: LocationTransactionHistoryParticipationStatus;

  @AllowNull(false)
  @ForeignKey(() => LocationModel)
  @Column({ type: DataType.UUID })
  declare locationId: string;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  declare managedBy: string;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare paidAt: Date | null;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare refundedAt: Date | null;

  // # Relations
  @BelongsTo(() => LocationModel, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  declare location: LocationModel;

  @BelongsTo(() => UserModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  declare user: UserModel;

  @BelongsTo(() => UserModel, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  declare manager: UserModel;
}

export default LocationTransactionHistoryModel;
