import { Proposal } from '../Models/Proposal.js';
import { proposalSchemaValidation } from '../Models/Proposal.js';
import { Project } from '../Models/Project.js';

export const addProposalToProject = async (req, res) => {
    const { id } = req.params; 
    const project = await Project.findById(id);
  
    if (!project) {
      return res.status(403).json({ message: "Project do not exist" });
    }
    let {error}= proposalSchemaValidation.validate(req.body);
    
    if(error) {
      return res.status(404).json({message : error.details[0].message});
    }
    const proposal = new Proposal(req.body);
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
