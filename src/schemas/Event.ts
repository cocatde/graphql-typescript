import { ID, Field, ObjectType, Float } from 'type-graphql';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import User from "./User";

@Entity()
@ObjectType()
export default class Event {

  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  readonly id: string;

  @Column()
  @Field()
  eventName: string

  @Column()
  @Field()
  category: string

  @Column()
  @Field()
  eventInfo: string

  @Column()
  @Field()
  eventDate: string

  @ManyToOne(type => User, user => user.events)
  @Field(type => User)
  organizer: User
  @Column({ nullable: true})
  organizerId: string

  @Column({ type: 'double precision' })
  @Field(type => Float)
  cost: number

}