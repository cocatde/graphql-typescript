import { Root, FieldResolver, Mutation, Query, Arg, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import User from "../schemas/User";
import Event from "../schemas/Event";
import Enrollment from "../schemas/Enrollment";
import { EventInput } from "./types/EventInput";

@Resolver(Event)
export class EventResolver {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Enrollment) private readonly enrollmentRepository: Repository<Enrollment>,
  ) { }

  @Query(returns => Event, { nullable: true })
  event(@Arg("id") eventId: string) {
    return this.eventRepository.findOne(eventId);
  }

  @Query(returns => [Event])
  events() {
    return this.eventRepository.find()
  }

  @Mutation(returns => Event)
  async addEvent(
    @Arg("event") eventInput: EventInput,
    @Arg("userId") userId: string,
  ): Promise<Event> {
    const user = await this.userRepository.findOneOrFail(userId);
    if (user.privilegeLevel !== 0) {
      throw Error("You are not organizor");
    }
    const event = this.eventRepository.create({
      ...eventInput,
      organizer: user,
    });
    return await this.eventRepository.save(event);
  }

  @FieldResolver()
  async organizer(@Root() event: Event): Promise<User> {
    return (await this.userRepository.findOne(event.organizerId, { cache: 1000 }))!;
  }

  @FieldResolver()
  async enrollments(@Root() event: Event): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      event,
    });
  }
}