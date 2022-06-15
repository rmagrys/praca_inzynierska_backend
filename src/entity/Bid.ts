import { Length, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Auction } from "./Auction";
import { User } from "./User";

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  @Length(2, 50)
  description: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bids, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "buyer_id" })
  buyer?: User;

  @ManyToOne(() => Auction, (auction) => auction.bids, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "auction_id" })
  auction?: Auction;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
