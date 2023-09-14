import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema/typedef";
import fs from "fs";
import resolvers from "./resolvers/resolverIndex";
import mongoose from "./utils/db";
import * as gql from "graphql";
import { makeExecutableSchema } from "graphql-tools";
require("dotenv").config();
import nodemon from "nodemon";
import http from "http";
import child_process from "child_process";

const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers });
console.log(process.cwd());

const server = new ApolloServer({ schema });
const startServer = async () => {
  // await mongoose();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 2000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();

export async function restartServer() {
  console.log("Restarting server...");

  server.stop();

  child_process.fork(__filename);
}

// setTimeout(() => {
//   restartServer();
// }, 5000); // Restart the server after 5 seconds (for demonstration purposes)
