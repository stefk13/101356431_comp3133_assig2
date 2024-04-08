import { gql } from "apollo-angular"

const GET_EMPLOYEES = gql `
query GetEmployees {
  getEmployees {
    first_name
    last_name
    email
    gender
    salary
  }
}
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
    createEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $first_name: String, $last_name: String, $email: String, $gender: String, $salary: Float) {
    updateEmployeeByID(_id: $id, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployeeByID(_id: $id) {
      success
      message
    }
  }
`;

export {GET_EMPLOYEES, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE}