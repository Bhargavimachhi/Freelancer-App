import { Proposal } from '../Models/Proposal.js';
import { proposalSchemaValidation } from '../Models/Proposal.js';
import { Project } from '../Models/Project.js';
import { User } from '../Models/User.js';

export const addProposalToProject = async (req, res) => {
    const { id } = req.params; 
    const {  Clerk_id,description,price,answers } = req.body;
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
      description:description,
      price: price,
      answers:answers

    };
    
    const proposal = new Proposal(newprojectdata);
    project.proposals.push(proposal._id);

    project.save();
  
    proposal
      .save()
      .then(() => {
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
