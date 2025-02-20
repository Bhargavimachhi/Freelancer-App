import { Project } from "../Models/Project.js";
import { StreamChat } from "stream-chat";
import { User } from "../Models/User.js";

const apiKey = "uu4gqeduxqn7";
const apiSecret =
  "xeqvkqqtzc27jy3e28vdhj7an64gpwwjrkpy5dhpqks6dkv3ud9sdhdj6wmtvbnc";
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export const checkIfUserExists = async (req, res) => {
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
};

export const getTokenbyClerkID = async (req, res) => {
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
};

export const getToken = async (req, res) => {
  const { useremail } = req.body;

  const requser = await User.findOne({ email: useremail });

  console.log(useremail);

  const token = serverClient.createToken(requser.Clerk_id);

  await serverClient.upsertUser({
    id: requser.Clerk_id,
    name: requser.name,
  });

  res.json({ token, userId: requser.Clerk_id });
};

export const getProjectsbyClerkID = async(req,res) =>{
    const {Clerk_id} = req.body;
  
    const requser = await User.findOne({
      Clerk_id: Clerk_id
    });
  
    const createdProjects = requser.createdProjects;
  
    return res.json({
      createdProjects
    });
  
  
  };

  export const getprojectByID = async(req,res)=>{
    const {id} = req.body;
    const reqproject = await Project.findById(
      {
        _id: id
      }
    );
    return res.json({
      reqproject
    });
  };