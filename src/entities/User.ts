import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";

@Index("uq_user_user_name", ["userName"], { unique: true })
@Entity("user", { schema: "psep-db" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "user_name", unique: true, length: 255 })
  userName: string;

  @Column("varchar", { name: "user_password", length: 255 })
  userPassword: string;

  @Column("datetime", {
    name: "user_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  userCreatedAt: Date;

  @Column("bool", { name: "user_active", default: () => "'true'" })
  userActive: boolean;

  @OneToMany(() => Order, (order) => order.orderUser)
  orders: Order[];
}
