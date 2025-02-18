import mongoose from 'mongoose';

let skillsSchema = new mongoose.Schema({
    skills : {
        type : [String],
        default : []
    }
});

export const Skills = mongoose.model("Skills", skillsSchema);