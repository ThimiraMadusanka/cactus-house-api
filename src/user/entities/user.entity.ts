import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'tbl_user',
  timestamps: false,
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    field: 'name',
    type: DataType.STRING(255),
  })
  name: string;

  @Column({
    field: 'email',
    type: DataType.TEXT,
  })
  email: string;

  @Column({
    field: 'password',
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    field: 'contact_number',
    type: DataType.STRING(10),
  })
  contactNumber: string;

  @Column({
    field: 'billing_address',
    type: DataType.TEXT,
  })
  billingAddress: string;

  @Column({
    field: 'type',
    type: DataType.STRING(10),
  })
  type: string;

  @Column({
    field: 'status',
    type: DataType.STRING(10),
  })
  status: string;

  @Column({
    field: 'created_time',
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    field: 'updated_time',
    type: DataType.DATE,
  })
  updatedAt: Date;
}
