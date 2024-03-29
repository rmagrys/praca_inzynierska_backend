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
import { User } from "./User";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  @Length(2, 50)
  description: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.payments, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "buyer_id" })
  buyer?: User;

  @OneToOne(() => Auction, (auction) => auction.payment)
  @JoinColumn({ name: "auction_id" })
  auction?: Auction;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
