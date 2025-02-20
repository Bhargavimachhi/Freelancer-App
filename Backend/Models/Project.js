import mongoose from "mongoose";
import joi from 'joi';
import JoiObjectId from "joi-objectid";
const ObjectId = JoiObjectId(joi);

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
    createdBy : {
        type : String,
        required : true
    },
    file : {
        type : String,
        default : null
    },
    experienceLevel : {
        type : String,
        enum: ['basic', 'intermediate', 'expert'],
        required : true,
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
    },
    postedOn : {
        type : Date,
        default : Date.now()
    }
});

export const projectSchemaValidation = joi.object({
    title : joi.string().required(),
    description : joi.string().required(),
    createdBy : joi.string().required(),
    experienceLevel : joi.string().required().valid('basic', 'intermediate', 'expert'),
    price : joi.number().required(),
});

export const Project = mongoose.model("Project", projectSchema);