import { getRepository } from "typeorm";

import User from "./schemas/User";
import Event from "./schemas/Event";

export async function seedDatabase() {
  const userRepository = getRepository(User);
  const eventRepository = getRepository(Event);

  const organizer = userRepository.create({
    userName: "organizer",
    password: "s3cr3tp4ssw0rd",
    phone: "412312312",
		email: "organizer@cshare.com",
    privilegeLevel: 0,
  });
  await userRepository.save(organizer);
  const participant = userRepository.create({
    userName: "participant",
    password: "s3cr3tp4ssw0rd",
    phone: "412312312",
		email: "participant@cshare.com",
    privilegeLevel: 1,
  });
  await userRepository.save(participant);

  const defaultEvent = eventRepository.create({
    eventName: "A midnight visit",
    category: "Show",
    eventInfo: "Journey to the edge of madness in an immersive theatre show of dark thrills and decadent mystery.",
    eventDate: "20180817",
    cost: 83,
    organizerId: organizer.id,
  });
  await eventRepository.save(defaultEvent);
}
