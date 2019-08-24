import { ID, Field, ObjectType, Int } from 'type-graphql';
import { OneToMany, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import Event from "./Event";
import Enrollment from "./Enrollment"

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
  privilegeLevel: number

  @OneToMany(type => Event, event => event.organizer)
  @Field(type => [Event])
  events: Event[];

  @OneToMany(type => Enrollment, enrollment => enrollment.user)
  @Field(type => [Enrollment])
  enrollments: Enrollment[];
}