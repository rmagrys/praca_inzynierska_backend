import { validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Auction } from "./Auction";
import { Product } from "./Product";

@Entity()
export class AuctionProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Auction, (auction) => auction.auctionsProducts, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "auction_id" })
  auction?: Auction;

  @ManyToOne(() => Product, (product) => product.auctionsProducts, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
