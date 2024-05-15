import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Restaurant } from "./Restaurant";
import { FoodOrder } from "./FoodOrder";

@Index(
  "uq_food_food_name_food_category_id_food_restaurant_id",
  ["foodName", "foodCategoryId", "foodRestaurantId"],
  { unique: true }
)
@Index("fk_food_category", ["foodCategoryId"], {})
@Index("fk_food_restaurant", ["foodRestaurantId"], {})
@Entity("food", { schema: "psep-db" })
export class Food {
  @PrimaryGeneratedColumn({ type: "int", name: "food_id", unsigned: true })
  foodId: number;

  @Column("varchar", { name: "food_name", length: 255 })
  foodName: string;

  @Column("int", { name: "food_category_id", unsigned: true })
  foodCategoryId: number;

  @Column("int", { name: "food_restaurant_id", unsigned: true })
  foodRestaurantId: number;

  @Column("datetime", {
    name: "food_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  foodCreatedAt: Date;

  @Column("datetime", { name: "food_updated_at", nullable: true })
  foodUpdatedAt: Date | null;

  @Column("datetime", { name: "food_deleted_at", nullable: true })
  foodDeletedAt: Date | null;

  @ManyToOne(() => Category, (category) => category.foods, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "food_category_id", referencedColumnName: "categoryId" },
  ])
  foodCategory: Category;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foods, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "food_restaurant_id", referencedColumnName: "restaurantId" },
  ])
  foodRestaurant: Restaurant;

  @OneToMany(() => FoodOrder, (foodOrder) => foodOrder.foodOrderFood)
  foodOrders: FoodOrder[];
}
