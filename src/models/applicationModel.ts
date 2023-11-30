import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    project : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'projects'
    },
    status : {
        type:String,
        enum:["pending","accepted","rejected"],
    },
},{timestamps: true});

// delete old model if exists
// delete old model
if (mongoose.models.applications) {
    const applicationModel = mongoose.model("applications");
    mongoose.deleteModel(applicationModel.modelName);
  }
  
  // create new model
  const Applcation= mongoose.model("applications", applicationSchema);
  export default Applcation;