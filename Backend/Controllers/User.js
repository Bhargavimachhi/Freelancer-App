import { User } from '../Models/User.js';
import { userSchemaValidation } from '../Models/User.js';
import { Project } from '../Models/Project.js';

export const addUser = async (req, res) => {
    let user = await User.find({ email: req.body.email });
  
    if (user && user.length > 0) {
      return res.status(403).json({ message: "User already exists" });
    }
    let {error}= userSchemaValidation.validate(req.body);
    
    if(error) {
      return res.status(404).json({message : error.details[0].message});
    }
    user = new User(req.body);
  
    user
      .save()
      .then(() => {
        res.status(200).json({ message: "User Added Successfully" });
      })
      .catch((err) => {
        res.status(500).json({message : "Error Occurred !!!"});
      });
};

export const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    let user = await User.findOne({_id : id});

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }

    return res.status(200).json({message : "success", user});
  } catch(err) {
    res.status(500).json({message : "Internal Server Error", err});
  }
}

export const editUser = async (req, res) => {

  try {
    let {id} = req.params;
    let user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }
    let {error}= userSchemaValidation.validate(req.body);
    
    if(error) {
      return res.status(404).json({message : error.details[0].message});
    }
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Profile details edited successfully" });
  }
  catch (err) {
    res.status(500).json({message : "Internal server error", err});
  }
};

export const editPropertiesOfUser = async (req, res) => {
  try {
    let {id} = req.params;
    let user = await User.findOne({Clerk_id : id});

    if (!user) {
      return res.status(403).json({ message: "User does not exists" });
    }

    let data = req.body;
    
    for (let key in data) {
      if (data.hasOwnProperty(key)) {

        if(key === 'email') {
          return res.status(404).json({ message: "Email cannot be edited" });
        }
        user[key] = data[key];
      }
    }
    user
      .save()
      .then(() => {
        res.status(200).json({ message: "Profile details edited successfully" });
      })
      .catch((err) => {
        res.status(500).json({message : "Error Occurred !!!"});
      });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message : "Internal server error", err});
  }
};

export const getAllProjectsOfUser = async(req,res)=>{

  const {id} = req.params;

  const requser = await User.findOne({
    Clerk_id: id
  });

  const userid = requser._id;
  console.log(userid);


  const projects = await Project.find({
    createdBy: {$ne:userid}
  });

  return res.status(200).json(projects);

}