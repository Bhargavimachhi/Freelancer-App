import mongoose from 'mongoose';
import joi from 'joi';
import JoiObjectId from "joi-objectid";
const ObjectId = JoiObjectId(joi);


let proposalSchema = new mongoose.Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
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
    createdBy : ObjectId().required(),
    description : joi.string().required(),
    price : joi.number().required(),
});

export const Proposal = mongoose.model("Proposal", proposalSchema);