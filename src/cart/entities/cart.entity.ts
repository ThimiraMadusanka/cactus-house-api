import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'tbl_cart',
  timestamps: false,
})
export class CartModel extends Model<CartModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    field: 'user_rid',
    type: DataType.SMALLINT,
  })
  userRid: number;

  @Column({
    field: 'product_rid',
    type: DataType.SMALLINT,
  })
  productRid: number;

  @Column({
    field: 'amount',
    type: DataType.STRING(10),
  })
  amount: string;

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
