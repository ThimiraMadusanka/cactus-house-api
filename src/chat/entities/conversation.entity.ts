import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'tbl_conversation',
  timestamps: false,
})
export class ConversationModel extends Model<ConversationModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    field: 'session_id',
    type: DataType.TEXT,
  })
  sessionId: string;

  @Column({
    field: 'message_content',
    type: DataType.TEXT,
  })
  messageContent: string;

  @Column({
    field: 'role',
    type: DataType.STRING(10),
  })
  role: string;

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
