const typeDefs = `#graphql
  type User {
    id: ID!
    # username: String!
    email: String!
    token: String
  }  
  type Mutation {
    signUp( email: String!, password: String!): User
    signIn(email: String!, password: String!): LoginResponse
  }
    type LoginResponse {
         token: String
          user: User
  }


  type Query {
    hello: String
    users: [User]
  }
`;

export default typeDefs;
