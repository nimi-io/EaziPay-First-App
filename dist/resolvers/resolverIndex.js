"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_Resolver_1 = require("./auth.Resolver");
const typedef_Resolver_1 = require("./typedef.Resolver");
const resolvers = {
    Query: {
        hello: () => "Hello, GraphQL!",
        users: () => { },
    },
    Mutation: {
        signUp: auth_Resolver_1.signUp,
        signIn: auth_Resolver_1.signIn,
        updateTypeDef: typedef_Resolver_1.updateTypeDef,
    },
};
exports.default = resolvers;
