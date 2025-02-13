import mongoose from "mongoose";

let projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type : String,
      required : true
    },
    tags : [{
      type : String,
      default : []
    }],
    questions : [{
        type : String,
        default : []
    }],
    proposals : [{
        type : mongoose.Schema.Types.ObjectId,
        default : []
    }],
    cretedBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    file : {
        type : String,
        default : null
    },
    experienceLevel : {
        type : String,
        enum: ['basic', 'intermediate', 'expert']
    },
    price : {
        type : Number,
        required : true,
    },
    hiredPerson : {
        type : mongoose.Schema.Types.ObjectId,
        default : null,
    },
    isJobDone : {
        type : Boolean,
        default : false,
    },
    isPaymentDone : {
        type : Boolean,
        default : false,
    }
});

export const Project = mongoose.model("Project", projectSchema);