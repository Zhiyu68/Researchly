import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required :true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmain : {
        type : String,
        required :true,
        default : false
    }
},{
    timestamps : true
});

// delete old model

const userModel = mongoose.model('user')
mongoose.deleteModel(userModel.modelName)

// create new model
module.exports = mongoose.model("users",userSchema);