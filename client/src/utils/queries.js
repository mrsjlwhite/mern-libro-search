import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query getSingleUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;