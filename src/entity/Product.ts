import { Length, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Auction } from "./Auction";
import { Category } from "./Category";

@Entity()
export class Product {
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

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @OneToOne(() => Auction, (auction) => auction.product)
  @JoinColumn({ name: "auction_id" })
  auction?: Auction;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
