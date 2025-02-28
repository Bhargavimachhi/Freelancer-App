import { User } from "../Models/User.js";
import { userSchemaValidation } from "../Models/User.js";
import { Project } from "../Models/Project.js";
import { Proposal } from "../Models/Proposal.js";
import { request } from "express";

export const addUser = async (req, res) => {
  let user = await User.find({ email: req.body.email });

  if (user && user.length > 0) {
    return res.status(403).json({ message: "User already exists" });
  }
  let { error } = userSchemaValidation.validate(req.body);

  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }
  user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(200).json({ message: "User Added Successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Occurred !!!" });
    });
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }

    return res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const getUserUsingEmail = async(req, res) => {
  try {
    const { email } = req.params;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }

    return res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
}

export const getUserUsingClerkId = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({ Clerk_id: id });

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }

    return res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const editUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }
    let { error } = userSchemaValidation.validate(req.body);

    if (error) {
      return res.status(404).json({ message: error.details[0].message });
    }
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Profile details edited successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

export const editPropertiesOfUser = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    let user = await User.findOne({ Clerk_id: id });

    if (!user) {
      return res.status(403).json({ message: "User does not exist" });
    }

    let data = req.body;

    // Prevent email updates
    if (data.email) {
      return res.status(404).json({ message: "Email cannot be edited" });
    }

    // Ensure projects is an array
    if (data.projects && !Array.isArray(data.projects)) {
      return res.status(400).json({ message: "Projects must be an array" });
    }

    // Validate `reviews` format
    if (data.reviews && !Array.isArray(data.reviews)) {
      return res.status(400).json({ message: "Reviews must be an array" });
    }

    // Ensure skills is an array
    if (data.skills && !Array.isArray(data.skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    // Update user data
    user.set(data); // Use `set` instead of `Object.assign`

    await user.save();
    res.status(200).json({ message: "Profile details edited successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

export const getAllProjectsOfUser = async (req, res) => {
  const { id } = req.params;

  const requser = await User.findOne({
    Clerk_id: id,
  });

  if(!requser) {
    return res.status(200).json([]);
  }

  const userid = requser._id;

  const projects = await Project.find({
    createdBy: userid,
  });

  return res.status(200).json(projects);
};

export const shortlistUser = async (req, res) => {
  const id = req.params.id;

  const reqproposal = await Proposal.findByIdAndUpdate(
    id,
    {
      isShortListed: true,
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ reqproposal, message: "The proposal is shortlisted." });
};

export const addReviewToUser = async(req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findOne({Clerk_id : id});

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }
    let data = req.body;

    if(!data.createdBy) {
      return res.status(403).json({ message: "Creator of review does not exists" });
    }

    if(!data.rating) {
      return res.status(403).json({ message: "Enter Rating" });
    }

    if(isNaN(data.rating)) {
      return res.status(403).json({ message: "Rating should be number" });
    }

    if(data.rating < 1 || data.rating > 5) {
      return res.status(403).json({ message: "Rating should be between 1 and 5" });
    }

    user.reviews.push(req.body);
    user.rating = ((user.rating * (user.reviews.length-1))+data.rating)/user.reviews.length;
    await user.save();
    res.status(200).json({ message: "Review submitted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
  }
}
