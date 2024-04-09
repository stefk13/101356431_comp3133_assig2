
require('dotenv').config();
const User = require('./models/User');
const Employee = require('./models/Employee')
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        getEmployees: async () => {
            const employees = await Employee.find();
            return employees;
        },
        getEmployeeByID: async (_, { _id }) => {
            const employee = await Employee.findOne({ "_id": _id });
            if (!employee) {
                throw new Error('Employee not found')
            }
            return employee;
        },
        userLogin: async (_, {_id, password}) => {
            const user = await User.findById(_id);
            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); 

            return {
                ...user.toJSON(), 
                token,
            };
        },
    },
    Mutation: {
        createUser: async (_, { _id, email, password }) => {
            const user = new User({ _id, email, password });
            await user.save();
            return user;
        },
        createEmployee: async (_, {first_name, last_name, email, gender, salary}) => {
            const employee = new Employee({first_name, last_name, email, gender, salary});
            await employee.save();
            return employee;
        },
        updateEmployeeByID: async (_, { _id, first_name, last_name, email, gender, salary }) => {
            const employee = await Employee.findByIdAndUpdate(_id, { first_name, last_name, email, gender, salary }, { new: true });
            if (!employee) {
                throw new Error('Employee not found');
            }
            return employee;
        },
        deleteEmployeeByID: async (_, { _id }) => {
            try {
              const employee = await Employee.findByIdAndDelete(_id);
              if (!employee) {
                throw new Error(`Employee with ID ${_id} not found`);
              }
              return { 
                success: true, 
                _id: employee._id.toString(), 
                message: `Employee ${employee.first_name} ${employee.last_name} was successfully deleted`
              };
            } catch (error) {
              console.error("Error deleting employee:", error);
              throw new Error("Error processing delete operation");
            }
        }
    }
}

module.exports = resolvers;