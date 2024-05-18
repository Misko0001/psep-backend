import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("tinyint", { name: "user_active", default: () => "'1'" })
  userActive: number;
}
