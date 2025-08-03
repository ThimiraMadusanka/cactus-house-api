import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'tbl_product',
  timestamps: false,
})
export class ProductModel extends Model<ProductModel> {
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
    field: 'description',
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    field: 'price',
    type: DataType.STRING(10),
  })
  price: string;

  @Column({
    field: 'quantity',
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    field: 'image_url',
    type: DataType.TEXT,
  })
  imageUrl: string;

  @Column({
    field: 'tags',
    type: DataType.TEXT,
  })
  tags: string;

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
