const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const validator = (val) => {
    const valReg = /\w+@\w+.com$/gi;
    return valReg.test(val);
}

const customValidator = [validator, "Email Syntax is not appropriate."];

const UserSchema = new Schema({
    fname:{
        type: String
    },
    lname:{
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String
    },
    hash:{
        type: String
    },
    email:{
        type: String, 
        required: true,
        unique: true,
        validate: customValidator
    },
    emailVerified:{
        type: Boolean, 
        default: false,
        required: true
    },
    admin:{
        type: Boolean, 
        default: false,
        required: true
    }
});


module.exports = mongoose.model('User', UserSchema);