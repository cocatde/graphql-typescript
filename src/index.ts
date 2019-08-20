// src/index.ts

import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import ProjectResolver from "./resolvers/ProjectResolver";
import TaskResolver from "./resolvers/TaskResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ProjectResolver, TaskResolver],
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