import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as UUID } from 'uuid';
import { BaseModel, IBase } from './BaseModel_';

export type SystemSecurity = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE' | 'UNKNOWN';

export interface ISystem extends IBase {
  id: string;
  name: string;
  description?: string | null;
  security: SystemSecurity;
}

@Table({ tableName: 'system' })
export class SystemModel extends BaseModel implements ISystem {
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
  declare description: string | null;

  @AllowNull(false)
  @Default('UNKNOWN')
  @Column({ type: DataType.ENUM('HIGH', 'MEDIUM', 'LOW', 'NONE', 'UNKNOWN') })
  declare security: SystemSecurity;
}

export default SystemModel;
