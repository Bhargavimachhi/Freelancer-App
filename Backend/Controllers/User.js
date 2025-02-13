import { User } from '../Models/User.js';
import { userSchemaValidation } from '../Models/User.js';

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
    let user = await User.findById(id);

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
    await Listing.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Profile details edited successfully" });
  }
  catch (err) {
    res.status(500).json({message : "Internal server error", err});
  }
};