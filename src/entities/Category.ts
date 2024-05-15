import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Food } from "./Food";

@Index("uq_category_category_name", ["categoryName"], { unique: true })
@Entity("category", { schema: "psep-db" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", { name: "category_name", unique: true, length: 255 })
  categoryName: string;

  @Column("datetime", {
    name: "category_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  categoryCreatedAt: Date;

  @Column("datetime", { name: "category_updated_at", nullable: true })
  categoryUpdatedAt: Date | null;

  @Column("datetime", { name: "category_deleted_at", nullable: true })
  categoryDeletedAt: Date | null;

  @OneToMany(() => Food, (food) => food.foodCategory)
  foods: Food[];
}
