import { Mutation, Query, Arg, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Event from "../schemas/Event";
import { EventInput } from "./types/EventInput";

@Resolver(Event)
export class EventResolver {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>
  ) { }

  @Query(returns => Event, { nullable: true})
  event(@Arg("id") eventId: string) {
    return this.eventRepository.findOne(eventId)
  }

  @Query(returns => [Event])
  events() {
    return this.eventRepository.find()
  }

  @Mutation(returns => Event)
  async addEvent(
    @Arg("event") eventInput: EventInput,
  ): Promise<Event> {
    const event = this.eventRepository.create(eventInput);
    return await this.eventRepository.save(event);
  }
}