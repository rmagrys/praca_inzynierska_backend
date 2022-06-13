import { IsDefined, IsEmail, Length, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auction } from "./Auction";
import { Bid } from "./Bid";
import { Payment } from "./Payment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @IsDefined()
  @Length(2, 50)
  firstName: string;

  @Column()
  @IsDefined()
  @Length(2, 70)
  lastName: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column()
  @Length(5, 20)
  phone: string;

  @Length(2, 50)
  nickname: string;

  @OneToMany(() => Payment, (payment) => payment.buyer, {
    cascade: ["insert", "update"],
  })
  payments?: Payment[];

  @OneToMany(() => Auction, (auction) => auction.seller, {
    cascade: ["insert", "update"],
  })
  auctions?: Auction[];

  @OneToMany(() => Bid, (bid) => bid.buyer, {
    cascade: ["insert", "update"],
  })
  bids?: Bid[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
