import { InputType, Field } from 'type-graphql';
import Enrollment from "../../schemas/Enrollment";

@InputType()
export class EnrollmentInput implements Partial<Enrollment> {

  @Field()
  userId: string

  @Field()
  eventId: string
}