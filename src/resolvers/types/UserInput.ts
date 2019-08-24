import { InputType, Field, Int } from 'type-graphql';
import User from "../../schemas/User";

@InputType()
export class UserInput implements Partial<User> {

  @Field()
  userName: string

  @Field()
  password: string

  @Field()
  phone: string

  @Field()
  email: string

  @Field(type => Int)
  privilegeLevel: number
}