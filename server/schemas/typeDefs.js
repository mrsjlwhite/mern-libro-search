const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    getSingleUser: User
  }
  
  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    saveBook(booksBody: String!): Book
    deleteBook:(booksBody: String!): Book
  }
`;

module.exports = typeDefs;

