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
import { ProductModel } from 'src/product/entities/product.entity';

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
    type: DataType.BIGINT,
  })
  userRid: number;

  @ForeignKey(() => ProductModel)
  @Column({
    field: 'product_rid',
    type: DataType.BIGINT,
  })
  productRid: number;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

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
