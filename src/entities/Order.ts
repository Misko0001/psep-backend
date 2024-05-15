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
import { State } from "./State";
import { User } from "./User";

@Index("fk_order_user", ["orderUserId"], {})
@Index("fk_order_state", ["orderStateId"], {})
@Entity("order", { schema: "psep-db" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column("int", { name: "order_user_id", unsigned: true })
  orderUserId: number;

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

  @ManyToOne(() => State, (state) => state.orders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "order_state_id", referencedColumnName: "stateId" }])
  orderState: State;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "order_user_id", referencedColumnName: "userId" }])
  orderUser: User;
}
