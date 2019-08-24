import { Root, FieldResolver, Mutation, Arg, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import User from "../schemas/User";
import Event from "../schemas/Event";
import Enrollment from "../schemas/Enrollment";
import { EnrollmentInput } from "./types/EnrollmentInput";

@Resolver(Enrollment)
export class EnrollmentResolver {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Enrollment) private readonly enrollmentRepository: Repository<Enrollment>,
  ) { }

  @Mutation(returns => Enrollment)
  async enroll(
    @Arg("enrollment") enrollmentInput: EnrollmentInput,
  ): Promise<Enrollment> {
    const user = await this.userRepository.findOneOrFail(enrollmentInput.userId);
    const event = await this.eventRepository.findOneOrFail(enrollmentInput.eventId);
    const previousEnrollments = await this.enrollmentRepository.find({ user, event });
    if (previousEnrollments.length !== 0) {
      throw Error("The user already enrolled");
    }
    const enrollment = this.enrollmentRepository.create({
      user: user,
      event: event,
    });
    return await this.enrollmentRepository.save(enrollment);
  }

  @FieldResolver()
  async user(@Root() enrollment: Enrollment): Promise<User> {
    return (await this.userRepository.findOne(enrollment.userId, { cache: 1000 }))!;
  }

  @FieldResolver()
  async event(@Root() enrollment: Enrollment): Promise<Event> {
    return (await this.eventRepository.findOne(enrollment.eventId, { cache: 1000 }))!;
  }
}