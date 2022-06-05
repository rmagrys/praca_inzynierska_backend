import { Length, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 50)
  name: string;

  @Column()
  @Length(2, 50)
  description: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: ["insert", "update"],
  })
  products?: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
