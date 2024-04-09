const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: String!
        email: String!
        password: String!
        token: String
    }
    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }
    type DeleteResponse {
        success: Boolean!
        _id: ID!
        message: String!
    }    
    
    type Query {
        getEmployees: [Employee]
        getEmployeeByID(_id: ID!): Employee
        userLogin(_id: String!, password: String!): User
    }
    
    type Mutation {
        createUser(_id: String!, email: String!, password: String!): User!
        createEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        updateEmployeeByID(_id: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
        deleteEmployeeByID(_id: ID!): DeleteResponse
    }
    

`
module.exports = typeDefs;