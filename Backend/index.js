import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { addUser, editPropertiesOfUser, editUser, getAllProjectsOfUser, getUser } from "./Controllers/User.js";
import { User } from "./Models/User.js";

import { getSkills } from "./Controllers/skills.js";

import { addProposalToProject, getProposal } from "./Controllers/proposals.js";
import { createProject, getAllProposalsOfProject, getProject } from "./Controllers/project.js";
import { checkIfUserExists, getprojectByID, getProjectsbyClerkID, getToken, getTokenbyClerkID } from "./Controllers/authentication.js";
import { Project } from "./Models/Project.js";
import { CreateOffer,AcceptOffer,DeclineOffer,PayOffer,sumbitwork,approvework } from "./Controllers/offers.js";
import { Offers } from "./Models/Offers.js";
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/Freelancing?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to Database");
    });
});

// User Routes
app.post("/user/add", addUser);
app.post("/user/:id/edit", editUser);
app.get("/user/:id", getUser);
app.post("/user/:id/edit-properties", editPropertiesOfUser);
app.get("/user/:id/projects", getAllProjectsOfUser);

//Project Routes
app.get("/project/:id", getProject);
app.post("/project/add", createProject);
app.post("/project/:id/add-proposal", addProposalToProject);
app.get("/project/:id/proposals", getAllProposalsOfProject);

//Proposal Routes
app.get("/proposal/:id", getProposal);

// Skills Routes 
app.get("/skills", getSkills);

// Authentication Routes
app.post("/checkifuserexists", checkIfUserExists);

//Offers Routes 
app.post("/CreateOffer",CreateOffer);
app.put("/:offerId/accept",AcceptOffer);
app.put("/:offerId/decline",DeclineOffer);
app.put("/:offerId/pay",PayOffer);
app.put("/:offerId/sumbit",sumbitwork);
app.put("/:offerId/approve",approvework);

// It takes in the email and gives the token for chatting
app.post("/getToken", getToken);

// It takes in the Clerk_id and gives the token for chatting
app.post("/getTokenbyClerkID", getTokenbyClerkID);

// Thiss sget the projects by the clerk_id
app.post("/getProjectsbyClerkID", getProjectsbyClerkID);

app.post("/getprojectByID", getprojectByID);

app.get("/freelancer/offers/:id",async(req,res)=>{
  const id = req.params.id;

  const user = await User.findOne({
    Clerk_id:id
  });

  const userid = user._id;

  const alloffers = await Offers.find({
    FreelancerId: userid
    
  });
  return res.status(200).json({
    alloffers
  });
});
app.get("/client/offers/:id",async(req,res)=>{
  const id = req.params.id;

  const user = await User.findOne({
    Clerk_id:id
  });

  const userid = user._id;

  const alloffers = await Offers.find({
    clientId: userid
    
  });
  return res.status(200).json({
    alloffers
  });
});