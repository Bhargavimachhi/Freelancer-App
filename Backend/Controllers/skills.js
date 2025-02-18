import {Skills} from '../Models/Skills.js';

export const getSkills = async (req, res) => {
  try {
    const id = '67b45fe0a6cb8823e5e1b0e0';
    let skills = await Skills.findById(id);

    if (!skills) {
      return res.status(403).json({ message: "skills does not exists" });
    }

    return res.status(200).json({message : "success", skills});
  } catch(err) {
    res.status(500).json({message : "Internal Server Error", err});
  }
}