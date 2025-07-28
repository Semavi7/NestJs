import {
  Column,
  PrimaryKey,
  Table,
  AutoIncrement,
  DataType,
  Model,
} from 'sequelize-typescript';
@Table({
  timestamps: true,
  paranoid: true,
})
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column(DataType.STRING)
  item: string;

  @Column(DataType.TEXT)
  userId: string;
}