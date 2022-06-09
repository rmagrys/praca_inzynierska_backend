import { Length, validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Auction } from "./Auction";

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Auction, (auction) => auction.pictures, {
    cascade: ["insert", "update"],
  })
  auction: Auction;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
