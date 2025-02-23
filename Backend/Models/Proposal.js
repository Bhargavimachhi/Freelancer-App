import mongoose from 'mongoose';
import joi from 'joi';


let proposalSchema = new mongoose.Schema({
    createdBy : {
        type : Object,
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
    isShortListed:{
        type:Boolean,
        default:false
    }
});

export const proposalSchemaValidation = joi.object({
    createdBy : joi.string().required(),
    description : joi.string().required(),
    price : joi.number().required(),
});

export const Proposal = mongoose.model("Proposal", proposalSchema);