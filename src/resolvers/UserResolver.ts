import { Mutation, Query, Arg, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import User from "../schemas/User";
import { UserInput } from "./types/UserInput";

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  @Query(returns => User, { nullable: true })
  login(@Arg("userName") userName: string, @Arg("password") password: string) {
    return this.userRepository.findOneOrFail({
      where: {
        userName: userName,
        password: password,
      }
    })
  }

  @Mutation(returns => User)
  async addUser(
    @Arg("user") userInput: UserInput,
  ): Promise<User> {
    const user = this.userRepository.create(userInput);
    return await this.userRepository.save(user);
  }
}