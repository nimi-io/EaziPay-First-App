"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typedef_1 = __importDefault(require("./schema/typedef"));
console.log(process.cwd());
const resolverIndex_1 = __importDefault(require("./resolvers/resolverIndex"));
const graphql_tools_1 = require("graphql-tools");
require("dotenv").config();
const child_process_1 = __importDefault(require("child_process"));
let serverProcess;
const schema = (0, graphql_tools_1.makeExecutableSchema)({ typeDefs: typedef_1.default, resolvers: resolverIndex_1.default });
console.log(process.cwd());
const server = new server_1.ApolloServer({ schema });
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // await mongoose();
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 2000 },
    });
    console.log(`🚀 Server ready at ${url}`);
});
startServer();
function restartServer() {
    console.log("Restarting server...");
    if (serverProcess) {
        server.stop(); // Terminate the current server process
    }
    server.stop(); // Terminate the current server process
    // Start a new server process
    serverProcess = child_process_1.default.fork(__filename);
}
setTimeout(() => {
    restartServer();
}, 5000); // restartApp(); // Restart the app after 5 seconds (for demonstration purposes)
