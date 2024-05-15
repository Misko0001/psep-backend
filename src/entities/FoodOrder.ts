import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Food } from "./Food";
import { Order } from "./Order";

@Index("fk_food_order_food", ["foodOrderFoodId"], {})
@Index("fk_food_order_order", ["foodOrderOrderId"], {})
@Entity("food_order", { schema: "psep-db" })
export class FoodOrder {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "food_order_id",
    unsigned: true,
  })
  foodOrderId: number;

  @Column("int", { name: "food_order_food_id", unsigned: true })
  foodOrderFoodId: number;

  @Column("int", { name: "food_order_order_id", unsigned: true })
  foodOrderOrderId: number;

  @Column("datetime", {
    name: "food_order_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  foodOrderCreatedAt: Date;

  @Column("datetime", { name: "food_order_updated_at", nullable: true })
  foodOrderUpdatedAt: Date | null;

  @Column("datetime", { name: "food_order_deleted_at", nullable: true })
  foodOrderDeletedAt: Date | null;

  @ManyToOne(() => Food, (food) => food.foodOrders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "food_order_food_id", referencedColumnName: "foodId" }])
  foodOrderFood: Food;

  @ManyToOne(() => Order, (order) => order.foodOrders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "food_order_order_id", referencedColumnName: "orderId" },
  ])
  foodOrderOrder: Order;
}
