import { IsDefined, IsEmail, Length, validateOrReject } from "class-validator";
import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

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

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
