import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema/schema";
import resolvers from "./resolvers/resolverIndex";
import mongoose from "./utils/db"; // Import your Mongoose connection
import schemaIndex from "./schema/schemaIndex";
import { makeExecutableSchema } from "graphql-tools";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // schema: schemaIndex,
// });

const schema = makeExecutableSchema({ typeDefs, resolvers,  });

const server = new ApolloServer({ schema });
const startServer = async () => {
  // await mongoose();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 2000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};
startServer();
