import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as UUID } from 'uuid';
import { BaseModel, IBase } from './BaseModel_';

export interface IUser extends IBase {
  id: string;
  handle: string;
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
}

export default UserModel;
