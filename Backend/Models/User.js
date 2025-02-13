import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
    },
    contact :{
        type: Number,
    },
    password :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true,
    },
    resume :{
        type : String,
        default : null,
    },
    previousWork : {
        type : {
            projectsDone : {type: Number, default : 0},
            moneyEarned : {type: Number, default : 0},
        },
    },
    education: {
        type: [
            {
                school: { type: String, required: true },
                degree: { type: String, required: true },
                fieldOfStudy: { type: String, required: true },
                startDate: { type: String, required: true },
                endDate: { type: String, required: true },
                skills: [{ type: String, default: [] }],
            }
        ],
        default: []
    },
    projects: {
        type: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                link: { type: String },
                startDate: { type: String, required: true },
                endDate: { type: String, required: true },
                skills: [{ type: String, default: [] }],
            }
        ],
        default: []
    },
    rating : {
        type : Number,
        default : null,
    },
    languages : [{
        type : String,
        default : []
    }],
    skills : [{
        type : String,
        default : []
    }],
    expertise : {
        type : String,
        default : null
    },
    aboutMe : {
        type : String,
        default : null,
    },
    links : {
        type :[
            {
                name : {type: String, required : true},
                url : {type: String, required : true},
            }
        ],
        default : []
    },
    reviews : {
        type :[
            {
                createdBy : {type: mongoose.Schema.Types.ObjectId, required : true},
                rating : {type: Number, required : true},
                description : {type: String, required : true},
            }
        ],
        default : []
    },
});

export const User = mongoose.model("User", userSchema);