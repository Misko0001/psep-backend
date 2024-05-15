import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity("state", { schema: "psep-db" })
export class State {
  @PrimaryGeneratedColumn({ type: "int", name: "state_id", unsigned: true })
  stateId: number;

  @Column("varchar", { name: "state_name", length: 50 })
  stateName: string;

  @Column("datetime", {
    name: "state_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  stateCreatedAt: Date;

  @Column("datetime", { name: "state_updated_at", nullable: true })
  stateUpdatedAt: Date | null;

  @Column("datetime", { name: "state_deleted_at", nullable: true })
  stateDeletedAt: Date | null;

  @OneToMany(() => Order, (order) => order.orderState)
  orders: Order[];
}
