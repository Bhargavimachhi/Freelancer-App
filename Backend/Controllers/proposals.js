import { Proposal } from '../Models/Proposal.js';
import { proposalSchemaValidation } from '../Models/Proposal.js';
import { Project } from '../Models/Project.js';
import { User } from '../Models/User.js';
import { GiveScorceToProposalUsingParameters } from './AIFunctions.js';

export const addProposalToProject = async (req, res) => {
    const { id } = req.params; 
    const { Clerk_id } = req.body;
    const project = await Project.findById(id);
    const requser = await User.findOne({ Clerk_id: Clerk_id });
    
    if (!requser) {
      return res.status(404).json({ message: "User not found" });
    }
  
    if (!project) {
      return res.status(403).json({ message: "Project do not exist" });
    }

    const newprojectdata = {
      createdBy: requser._id,
      description: req.body.description,
      price: req.body.price,
      answers: req.body.answers,
      project : id,
      milestonesRequiredTime : req.body.milestonesRequiredTime
    };

    // console.log(newprojectdata);

    const {error} = proposalSchemaValidation.validate(newprojectdata);
    // console.log(error);

    if(error) {
      return res.status(404).json({ message: error.details[0].message });
    }
    
    const proposal = new Proposal(newprojectdata);
    project.proposals.push(proposal._id);

    project.save();
  
    proposal
      .save()
      .then(async() => {
        proposal.aiScore = await GiveScorceToProposalUsingParameters(id, proposal._id.toString());
        proposal.save();
        res.status(200).json({ message: "Proposal Added Successfully" });
      })
      .catch((err) => {
        res.status(500).json({message : "Error Occurred !!!"});
      });
};

export const getProposal = async (req, res) => {
    try {
        const { id } = req.params;
        let proposal = await Proposal.findById(id);
    
        if (!proposal) {
          return res.status(403).json({ message: "Proposal does not exists" });
        }
    
        return res.status(200).json({message : "success", proposal});
    } catch(err) {
        return res.status(500).json({message : "Internal Server Error", err});
    }
}
