const {Schema, model } = require('mongoose')

const UserSchema = new Schema({
    
        _id: { 
                type: String, 
                required: [true, "Please Enter Username"], 
                unique: true,
                trim: true,
                alias: 'username' 
        },
        email: {
                type: String,
                required: [true, "Please Enter an Email"],
                unique: [true, "Email Already Exists"],
                trim: true,
                lowercase: true,
                validate:{
                      validator: function(value){
                              var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                              return emailRegex.test(value);
                      },
                      message: props => `${props.value} Must Be a Valid Email`
                 }
              },
        password: {
                type: String, 
                required: [true, "Please Enter a Password"], 
                trim: true
        }    
})

module.exports = model ('User', UserSchema)