import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
    userType : {
        type : String,
        required : true,
        default : "student"
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required :true,
        unique : true,
    },
    phone : {
        type : String,
        required :false,
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required :true,
        default : false
    },

    // additional fields for Student
    skills :{
        type: [],
        required: false,
    },
    experience :{
        type: [],
        required: false,
    },
    education :{
        type: [],
        required: false,
    },
    carrierObjective :{
         type: String,
        required: false,
    },

    // additional fields for Researcher
    establishmentYear :{
        type: String,
        required: false,
    },
    companySize :{
        type: String,
        required: false,
    },
    website :{
        type: String,
        required: false,
    },
    about :{
         type: String,
        required: false,
    },
    address :{
        type: String,
       required: false,
   },

},{
    timestamps : true
});


// delete old model
if (mongoose.models.users) {
    const userModel = mongoose.model("users");
    mongoose.deleteModel(userModel.modelName);
  }
  
  // create new model
  const User = mongoose.model("users", userSchema);
  export default User;