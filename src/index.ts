import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import Event from "./schemas/Event";
import { EventResolver } from "./resolvers/EventResolver";

TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    await TypeORM.createConnection({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
      entities: [Event],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      dropSchema: true,
      cache: true,
    });

    const schema = await buildSchema({
      resolvers: [EventResolver],
      container: Container,
    });

    const server = new GraphQLServer({
      schema,
    });

    const options = {
      port: 8000,
      endpoint: '/graphql',
      playground: '/playground',
    };

    server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
}

bootstrap();