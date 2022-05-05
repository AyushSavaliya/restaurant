const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const registerschema = new mongoose.Schema({
    firstname: {
        type: String
        // required: true
    },
    lastname: {
        type: String
        // required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        min: 10,
    
    },
    subject: {
        type: String,
        required: true
    }
    

});

registerschema.pre("save",async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    this.cpassword = await bcrypt.hash(this.cpassword,10);
    //   console.log(this.password); 
 next();    
});

const Register = new mongoose.model("Register", registerschema);
module.exports = Register;

