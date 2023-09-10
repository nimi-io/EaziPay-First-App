// schema.ts

const typeDefs = `#graphql
  type User {
    id: ID!
    # username: String!
    email: String!
    token
  }  
  type Mutation {
    signup( email: String!, password: String!): User
    login(email: String!, password: String!): LoginResponse
  }
    type LoginResponse {
         token: String
          user: User }

  type Query {
    hello: String,
    users: [User]

  }

`;

export default typeDefs;
