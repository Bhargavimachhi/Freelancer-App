import { Proposal } from '../Models/Proposal.js';
import { projectSchemaValidation } from '../Models/Project.js';
import { Project } from '../Models/Project.js';

export const getProject = async(req, res) => {
    try {
        const { id } = req.params;
        let project = await Project.findById(id);
    
        if (!project) {
          return res.status(403).json({ message: "Project does not exists" });
        }
    
        return res.status(200).json({message : "success", project});
    } catch(err) {
        return res.status(500).json({message : "Internal Server Error", err});
    }
} 

export const createProject = async (req, res) => {
    let {error}= projectSchemaValidation.validate(req.body);
    
    if(error) {
      return res.status(404).json({message : error.details[0].message});
    }
    const project = new Project(req.body);
  
    project
      .save()
      .then(() => {
        res.status(200).json({ message: "Project Added Successfully" });
      })
      .catch((err) => {
        res.status(500).json({message : "Error Occurred !!!", err});
      });
};

export const getAllProposalsOfProject = async(req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if(!project) {
        return res.status(404).json({message : "Project does not exist"});
    }
    let proposals = [];

    project.proposals.map(async(id) => {
        let proposal = await Proposal.findById(id);
        proposals.push(proposal);
    });

    project
      .save()
      .then(() => {
        res.status(200).json({ message: "success", proposals });
      })
      .catch((err) => {
        res.status(500).json({message : "Error Occurred !!!"});
      });
}
