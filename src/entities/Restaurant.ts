import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Food } from "./Food";

@Index("uq_restaurant_restaurant_name", ["restaurantName"], { unique: true })
@Entity("restaurant", { schema: "psep-db" })
export class Restaurant {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "restaurant_id",
    unsigned: true,
  })
  restaurantId: number;

  @Column("varchar", { name: "restaurant_name", unique: true, length: 255 })
  restaurantName: string;

  @Column("datetime", {
    name: "restaurant_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  restaurantCreatedAt: Date;

  @Column("datetime", { name: "restaurant_updated_at", nullable: true })
  restaurantUpdatedAt: Date | null;

  @Column("datetime", { name: "restaurant_deleted_at", nullable: true })
  restaurantDeletedAt: Date | null;

  @OneToMany(() => Food, (food) => food.foodRestaurant)
  foods: Food[];
}
