import { Length, validateOrReject } from "class-validator";
import { AuctionType } from "../enum/AuctionType";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Bid } from "./Bid";
import { Payment } from "./Payment";
import { Picture } from "./Picture";

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  priceDrop: number;

  @Column({ nullable: true })
  minimumPrice: number;

  @Column()
  auctionType: AuctionType;

  @Column({ type: "timestamp", nullable: true })
  completionDate: Date;

  @Column({ type: "timestamp", nullable: true })
  intervalTime: Date;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.auctions, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  seller?: User;

  @OneToOne(() => Product, (Product) => Product.auction, {
    cascade: true,
  })
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @OneToMany(() => Bid, (bid) => bid.auction, {
    cascade: true,
  })
  bids?: Bid[];

  @OneToMany(() => Picture, (picture) => picture.auction, {
    cascade: true,
  })
  pictures?: Picture[];

  @OneToOne(() => Payment, (payment) => payment.auction)
  @JoinColumn({ name: "payment_id" })
  payment?: Payment;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
