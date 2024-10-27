import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as UUID } from 'uuid';
import { BaseModel, IBase } from './BaseModel_';

export type UserRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'SUPERVISOR' | 'SUPPORT' | 'USER';
export type UserPerk = 'BLACK' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
export type UserStatus = 'BLACKLISTED' | 'RESEARCHED' | 'SUSPENDED' | 'PENDING' | 'ACTIVE';
export type UserVisibility = 'PRIVATE' | 'ORG_ONLY' | 'PUBLIC';
export type UserRank = 'PARTNER' | 'TRUSTED' | 'REGULAR' | 'BASIC' | 'NEW';

export interface IUser extends IBase {
  id: string;
  handle: string;
  role: UserRole;
  rank: UserRank;
  perk: UserPerk;
  status: UserStatus;
  visibility: UserVisibility;
}

@Table({ tableName: 'user' })
export class UserModel extends BaseModel implements IUser {
  @PrimaryKey
  @Default(() => UUID())
  @Column({ type: DataType.UUID })
  declare id: string;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare handle: string;

  @AllowNull(false)
  @Default('USER')
  @Column({ type: DataType.ENUM('OWNER', 'ADMIN', 'MANAGER', 'SUPERVISOR', 'SUPPORT', 'USER') })
  declare role: UserRole;

  @AllowNull(false)
  @Default('NEW')
  @Column({ type: DataType.ENUM('PARTNER', 'TRUSTED', 'REGULAR', 'BASIC', 'NEW') })
  declare rank: UserRank;

  @AllowNull(false)
  @Default('NONE')
  @Column({ type: DataType.ENUM('BLACK', 'GOLD', 'SILVER', 'BRONZE', 'NONE') })
  declare perk: UserPerk;

  @AllowNull(false)
  @Default('PENDING')
  @Column({ type: DataType.ENUM('BLACKLISTED', 'RESEARCHED', 'SUSPENDED', 'PENDING', 'ACTIVE') })
  declare status: UserStatus;

  @AllowNull(false)
  @Default('PRIVATE')
  @Column({ type: DataType.ENUM('PRIVATE', 'ORG_ONLY', 'PUBLIC') })
  declare visibility: UserVisibility;
}

export default UserModel;
