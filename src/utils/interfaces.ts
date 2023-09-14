import { GraphQLSchema } from "graphql/type";

export interface SignupArgs {
  username: string;
  email: string;
  password: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
}
export interface ItypeDefs {
  typeDefs: any;
}
