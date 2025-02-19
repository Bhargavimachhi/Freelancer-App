import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { addUser, editUser, getUser } from "./Controllers/User.js";
import { User } from "./Models/User.js";

import { getSkills } from "./Controllers/skills.js";

import { StreamChat } from "stream-chat";
import { Project } from "./Models/Project.js";

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiKey = "uu4gqeduxqn7";
const apiSecret =
  "xeqvkqqtzc27jy3e28vdhj7an64gpwwjrkpy5dhpqks6dkv3ud9sdhdj6wmtvbnc";
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

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

app.post("/user/add", addUser);
app.post("/user/edit", editUser);
app.get("/user/:id", getUser);
app.get("/skills", getSkills);

app.post("/checkifuserexists", async (req, res) => {
  const email = req.body.email;
  console.log(email);

  const user = await User.findOne({
    email: email,
  });

  if (user) {
    res.json({ message: "User exist in database" });
  } else {
    res.json({ message: "User does not exist in database" });
  }
});

// It takes in the email and gives the token for chatting
app.post("/getToken", async (req, res) => {
  const { useremail } = req.body;

  const requser = await User.findOne({ email: useremail });

  console.log(useremail);

  const token = serverClient.createToken(requser.Clerk_id);

  await serverClient.upsertUser({
    id: requser.Clerk_id,
    name: requser.name,
  });

  res.json({ token, userId: requser.Clerk_id });
});

// It takes in the Clerk_id and gives the token for chatting
app.post("/getTokenbyClerkID", async (req, res) => {
  const { userId } = req.body;

  const requser = await User.findOne({
    Clerk_id: userId,
  });

  const token = serverClient.createToken(userId);

  await serverClient.upsertUser({
    id: requser.Clerk_id,
    name: requser.name,
  });

  res.json({ token, userId: requser.Clerk_id });
});

app.post("/CreateProject",async(req,res)=>{
  const { title, description, experienceLevel, price, tags, questions,projectFile, Clerk_id } = req.body;
  const requser = await User.findOne({
    Clerk_id: Clerk_id,
  });
  const project = new Project({
    title,
    description,
    experienceLevel,
    price,
    tags,
    questions,
    file: projectFile,
    cretedBy: requser._id,
  });
  try {
    const savedProject = await project.save();
    requser.createdProjects.push(savedProject._id);
    await requser.save();
    return res.json({ message: "Project Created", project: savedProject });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }


})

// Thiss sget the projects by the clerk_id
app.post("/getProjectsbyClerkID",async(req,res) =>{
  const {Clerk_id} = req.body;

  const requser = await User.findOne({
    Clerk_id: Clerk_id
  });

  const createdProjects = requser.createdProjects;

  return res.json({
    createdProjects
  });


});

app.post("/getprojectByID",async(req,res)=>{
  const {id} = req.body;
  const reqproject = await Project.findById(
    {
      _id: id
    }
  );
  return res.json({
    reqproject
  });
})