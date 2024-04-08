import { gql } from "apollo-angular"

const LOGIN_USER = gql`
  mutation Login($id: String!, $password: String!) {
    userLogin(_id: $id, password: $password) {
      _id
      email
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($id: String!, $email: String!, $password: String!) {
    createUser(_id: $id, email: $email, password: $password) {
      _id
      email
    }
  }
`;

export {LOGIN_USER, CREATE_USER}