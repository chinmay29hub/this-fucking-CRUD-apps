import mongoose, { mongo } from "mongoose"

export const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please Provide Unique Username"],
        unique : [true, "Username Exists"],
    },
    password : {
        type : String,
        required : [true, "Please Provide a Password"],
        unique : false
    },
    email : {
        type : String,
        required : [true, "Please Provide a Email"],
        unique : true
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    mobile : {
        type : Number
    },
    address : {
        type : String
    },
    profile : {
        type : String
    }
})

export default mongoose.model.Users || mongoose.model("User", UserSchema)