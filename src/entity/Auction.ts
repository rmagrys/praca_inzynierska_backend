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
import { AuctionProduct } from "./AuctionProduct";
import { Bid } from "./Bid";
import { Payment } from "./Payment";

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 50)
  price: number;

  @Column()
  @Length(2, 50)
  description: string;

  @Column()
  priceDrop: number;

  @Column()
  minimumPrice: number;

  @Column()
  auctionType: AuctionType;

  @Column({ type: "timestamp" })
  completionDate: Date;

  @Column({ type: "timestamp" })
  intervalTime: Date;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.auctions, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "user_id" })
  seller?: User;

  @OneToMany(() => AuctionProduct, (auctionProduct) => auctionProduct.auction, {
    cascade: ["insert", "update"],
  })
  auctionsProducts?: AuctionProduct[];

  @OneToMany(() => Bid, (bid) => bid.auction, {
    cascade: ["insert", "update"],
  })
  bids?: Bid[];

  @OneToOne(() => Payment, (payment) => payment.auction) // specify inverse side as a second parameter
  payment: Payment;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
