import { ID, Field, ObjectType, Float } from 'type-graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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

  @Column()
  @Field()
  organizerId: string

  @Column({ type: 'double precision' })
  @Field(type => Float)
  cost: number

}