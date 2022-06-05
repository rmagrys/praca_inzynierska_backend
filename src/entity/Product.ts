import { Length, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AuctionProduct } from "./AuctionProduct";
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

  @OneToMany(() => AuctionProduct, (auctionProduct) => auctionProduct.auction, {
    cascade: ["insert", "update"],
  })
  auctionsProducts?: AuctionProduct[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
