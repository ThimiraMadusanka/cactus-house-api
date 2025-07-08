import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'tbl_contact_us',
  timestamps: false,
})
export class ContactModel extends Model<ContactModel> {
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
    type: DataType.STRING(255),
  })
  email: string;

  @Column({
    field: 'message',
    type: DataType.TEXT,
  })
  message: string;

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
