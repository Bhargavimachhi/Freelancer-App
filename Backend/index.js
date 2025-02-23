import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { addUser, editPropertiesOfUser, editUser, getAllProjectsOfUser, getUser, getUserUsingClerkId, shortlistUser } from "./Controllers/User.js";
import { User } from "./Models/User.js";

import { getSkills } from "./Controllers/skills.js";

import { addProposalToProject, getProposal } from "./Controllers/proposals.js";
import { createProject, getAllProposalsOfProject, getProject } from "./Controllers/project.js";
import { checkIfUserExists, getprojectByID, getProjectsbyClerkID, getToken, getTokenbyClerkID } from "./Controllers/authentication.js";
import { Project } from "./Models/Project.js";
import { CreateOffer,AcceptOffer,DeclineOffer,PayOffer,sumbitwork,approvework, getAllOffersOfClient, getAllOffersOfFreelancer } from "./Controllers/offers.js";
import { Offers } from "./Models/Offers.js";
import { Proposal } from "./Models/Proposal.js";
import crypto from "crypto";
import { Cashfree } from "cashfree-pg";
import { payment, verify } from "./Controllers/payment.js";
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

Cashfree.XClientId = "TEST104789643c6ca7ecadb2f1637ba846987401";
Cashfree.XClientSecret = "cfsk_ma_test_ac00b5486fb8476e9c8a3ace1d691608_41004b67";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString('hex');

  const hash = crypto.createHash('sha256');
  hash.update(uniqueId);

  const orderId = hash.digest('hex');

  return orderId.slice(0, 12);
}


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
app.get("/user/clerk/:id", getUserUsingClerkId);
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
app.get("/client/:id/offers", getAllOffersOfClient);

// It takes in the email and gives the token for chatting
app.post("/getToken", getToken);

// It takes in the Clerk_id and gives the token for chatting
app.post("/getTokenbyClerkID", getTokenbyClerkID);

// Thiss sget the projects by the clerk_id
app.post("/getProjectsbyClerkID", getProjectsbyClerkID);

app.post("/getprojectByID", getprojectByID);

app.post('/payment', payment);

app.post('/verify', verify);

app.get("/freelancer/:id/offers", getAllOffersOfFreelancer);

app.put("/shortlist/user/:id", shortlistUser);
