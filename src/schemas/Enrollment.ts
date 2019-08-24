import { ID, Field, ObjectType } from 'type-graphql';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import User from "./User";
import Event from "./Event";

@Entity()
@ObjectType()
export default class Enrollment {

  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  readonly id: string;

  @ManyToOne(type => User, user => user.enrollments)
  @Field(type => User)
  user: User
  @Column({ nullable: true })
  userId: string

  @ManyToOne(type => Event, event => event.enrollments)
  @Field(type => Event)
  event: Event
  @Column({ nullable: true })
  eventId: string

}