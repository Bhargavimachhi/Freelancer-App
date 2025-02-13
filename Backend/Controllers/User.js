import User from '../Models/User.js';

export const addUser = async (req, res) => {
    let user = await User.find({ email: req.body.email });
  
    if (user && user.length > 0) {
      return res.status(403).json({ message: "User already exists" });
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