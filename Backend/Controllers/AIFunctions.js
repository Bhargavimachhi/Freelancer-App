import { Project } from "../Models/Project.js";
import {Proposal} from "../Models/Proposal.js";
import {ScoreProposal} from "../../AIfunctions/ScoreProposal.js";

export const GiveScorceToProposal = async(req,res) =>{

    const {projectid,proposalid} = req.body;

    const reqproject = await Project.findById(projectid);
    const reqproposal = await Proposal.findById(proposalid);

   

    
    const projectobject = {
        description: reqproject.description,
        tags: reqproject.tags,
        questions: reqproject.questions,
        experienceLevel:reqproject.experienceLevel,
        price:reqproject.price
    }
    const proposalobject = {
        price: reqproposal.price,
        description: reqproposal.description,
        answers: reqproposal.answers
    }
    const freelancerobject = {
        skills : reqproposal.createdBy.skills,
        aboutMe: reqproposal.createdBy.aboutMe,
        expertise: reqproposal.createdBy.expertise,
        rating : reqproposal.createdBy.rating
    };

    const scoreobject = await ScoreProposal(projectobject,proposalobject,freelancerobject);
    console.log("We got out nicely",scoreobject);

    return res.status(200).json({score: scoreobject.final_score});

};