import { ID, Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "Object representing todo" })
export default class Todo {
  @Field(type => ID)
  readonly id: string;

  @Field()
  title: string

  @Field()
  description: string

}