import mongoose from 'mongoose';
import joi from 'joi';
import JoiObjectId from "joi-objectid";
const ObjectId = JoiObjectId(joi);

let proposalSchema = new mongoose.Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    helpedBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    answers : [{
        type : String,
        default : []
    }],
    milestonesRequiredTime : [{
        type : Number,
        default : []
    }],
    isShortListed:{
        type:Boolean,
        default:false
    },
    file : {
        type : String,
        default : null
    },
    aiScore: {
        type: Number,
        default: 0,
    }
});

export const proposalSchemaValidation = joi.object({
    createdBy : joi.required(),
    project : joi.required(),
    description : joi.string().required(),
    price : joi.number().required(),
    answers : joi.array(),
    milestonesRequiredTime : joi.array(),
    file: joi.string(),
});

export const Proposal = mongoose.model("Proposal", proposalSchema);