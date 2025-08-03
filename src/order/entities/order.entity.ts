import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/entities/user.entity';

@Table({
  tableName: 'tbl_orders',
  timestamps: false,
})
export class OrderModel extends Model<OrderModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    field: 'order_id',
    type: DataType.TEXT,
  })
  orderId: string;

  @ForeignKey(() => UserModel)
  @Column({
    field: 'user_rid',
    type: DataType.BIGINT,
  })
  userRid: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({
    field: 'product_list',
    type: DataType.TEXT,
  })
  productList: string;

  @Column({
    field: 'total_amount',
    type: DataType.STRING(10),
  })
  totalAmount: string;

  @Column({
    field: 'contact_number',
    type: DataType.STRING(10),
  })
  contactNumber: string;

  @Column({
    field: 'shipping_address',
    type: DataType.TEXT,
  })
  shippingAddress: string;

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
