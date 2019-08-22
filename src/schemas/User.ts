import { ID, Field, ObjectType, Int } from 'type-graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export default class User {

  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  readonly id: string;

  @Column()
  @Field()
  userName: string

  @Column()
  @Field()
  password: string

  @Column()
  @Field()
  phone: string

  @Column()
  @Field()
  email: string

  @Column({ type: "int2" })
  @Field(type => Int)
  privilege_level: number
}