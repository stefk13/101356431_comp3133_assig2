const {Schema, model } = require('mongoose')

const EmployeeSchema = new Schema({
        first_name: {
          type: String,
          required: [true, "Please Enter First Name"],
          trim: true,
          lowercase: true
        },
        last_name: {
          type: String,
          required: [true, "Please Enter Last Name"],
          trim: true,
          lowercase: true
        },
        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
          validate:{
                validator: function(value){
                        var emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        return emailRegex.test(value);
                },
                message: props => `${props.value} Must Be a Valid Email`
           }
        },
        gender: {
          type: String,
          required: true,
          enum: {
                values: ['male', 'female', 'other'],
                message: '{VALUE} is not supported. Please choose from "male", "female, or "other"'
                },
          lowercase:true
        },
        salary: {
          type: Number,
          default: 0.0,
          validate: function(value){
            if(value < 0){
              throw new Error("Negative Salary Not allowed")
            }
          }
        }
})

module.exports = model ('Employee', EmployeeSchema)