import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FoodOrder } from "./FoodOrder";
import { Customer } from "./Customer";
import { State } from "./State";

@Index("fk_order_state", ["orderStateId"], {})
@Index("fk_order_customer", ["orderCustomerId"], {})
@Entity("order", { schema: "psep-db" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column("int", { name: "order_customer_id", unsigned: true })
  orderCustomerId: number;

  @Column("int", {
    name: "order_state_id",
    unsigned: true,
    default: () => "'1'",
  })
  orderStateId: number;

  @Column("datetime", {
    name: "order_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  orderCreatedAt: Date;

  @Column("datetime", { name: "order_updated_at", nullable: true })
  orderUpdatedAt: Date | null;

  @Column("datetime", { name: "order_deleted_at", nullable: true })
  orderDeletedAt: Date | null;

  @OneToMany(() => FoodOrder, (foodOrder) => foodOrder.foodOrderOrder)
  foodOrders: FoodOrder[];

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "order_customer_id", referencedColumnName: "customerId" },
  ])
  orderCustomer: Customer;

  @ManyToOne(() => State, (state) => state.orders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "order_state_id", referencedColumnName: "stateId" }])
  orderState: State;
}
