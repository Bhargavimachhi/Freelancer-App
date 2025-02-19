import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { addUser, editUser, getUser } from "./Controllers/User.js";
import { User } from "./Models/User.js";

import { getSkills } from "./Controllers/skills.js";

import { StreamChat } from "stream-chat";

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
