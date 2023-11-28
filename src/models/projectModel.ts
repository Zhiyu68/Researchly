import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    salaryFromRange : {
        type: Number,
        required: true
    },
    salaryToRange : {
        type: Number,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    projectType : {
        type: String,
        required: true
    },
    workMode : {
        type: String,
        required: true
    },
    experience : {
        type: String,
        required: true
    },
} , {timestamps: true});

// delete old model
if (mongoose.models.projects) {
    const projectModel = mongoose.model("projects");
    mongoose.deleteModel(projectModel.modelName);
  }
  
  // create new model
  const Project = mongoose.model("projects", projectSchema);
  export default Project;