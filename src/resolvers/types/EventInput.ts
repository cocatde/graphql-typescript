import { InputType, Field, Float } from 'type-graphql';
import Event from "../../schemas/Event";

@InputType()
export class EventInput implements Partial<Event> {

  @Field()
  eventName: string

  @Field()
  category: string

  @Field()
  eventInfo: string

  @Field()
  eventDate: string

  @Field(type => Float)
  cost: number
}