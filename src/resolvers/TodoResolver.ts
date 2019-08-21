import { Query, Arg, Resolver } from "type-graphql";
import { todos } from "../data";
import Todo from "../schemas/Todo";

@Resolver(Todo)
export default class {
  @Query(returns => Todo)
  todo(@Arg("id") todoId: string) {
    return todos.filter(todo => todo.id === todoId)[0];
  }
}