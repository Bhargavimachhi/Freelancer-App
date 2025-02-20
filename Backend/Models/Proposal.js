import mongoose from 'mongoose';
import joi from 'joi';
import JoiObjectId from "joi-objectid";
const ObjectId = JoiObjectId(joi);


let proposalSchema = new mongoose.Schema({
    createdBy : {
        type : String,
        required : true,
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
});

export const proposalSchemaValidation = joi.object({
    createdBy : joi.string().required(),
    description : joi.string().required(),
    price : joi.number().required(),
});

export const Proposal = mongoose.model("Proposal", proposalSchema);