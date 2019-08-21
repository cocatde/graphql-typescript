// src/index.ts

import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import TodoResolver from "./resolvers/TodoResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
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
}

bootstrap();