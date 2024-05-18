import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";

@Index("uq_customer_customer_email", ["customerEmail"], { unique: true })
@Entity("customer", { schema: "psep-db" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "customer_id", unsigned: true })
  customerId: number;

  @Column("varchar", { name: "customer_name", length: 255 })
  customerName: string;

  @Column("varchar", { name: "customer_email", unique: true, length: 255 })
  customerEmail: string;

  @Column("varchar", { name: "customer_phone", length: 255 })
  customerPhone: string;

  @Column("varchar", { name: "customer_address", length: 255 })
  customerAddress: string;

  @Column("datetime", {
    name: "customer_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  customerCreatedAt: Date;

  @Column("datetime", { name: "customer_updated_at", nullable: true })
  customerUpdatedAt: Date | null;

  @Column("datetime", { name: "customer_deleted_at", nullable: true })
  customerDeletedAt: Date | null;

  @OneToMany(() => Order, (order) => order.orderCustomer)
  orders: Order[];
}
