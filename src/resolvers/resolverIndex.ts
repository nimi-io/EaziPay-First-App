import { LoginArgs, SignupArgs } from "../utils/interfaces";
import { signIn, signUp } from "./auth.Resolver";
import { updateTypeDef } from "./typedef.Resolver";
const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
    users: () => {},
  },
  Mutation: {
    signUp,
    signIn,
    updateTypeDef,
  },
};

export default resolvers;
