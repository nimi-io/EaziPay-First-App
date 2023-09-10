import { LoginArgs, SignupArgs } from "../utils/interfaces";
import { signIn, signUp } from "./authResolver";
const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
    users: () => {},
  },
  Mutation: {
    signUp,
    signIn,
  },
};

export default resolvers;
