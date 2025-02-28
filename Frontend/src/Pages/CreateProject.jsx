import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
// import { Checkbox } from "../components/ui/checkbox";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { uploadFile } from "../../upload.js";
import { Cloudinary } from "@cloudinary/url-gen";
import Navigate from "@/helpers/Navigate";
import { skills as allSkills } from "../../data/skills";
import toast from "react-hot-toast";

const CreateProject = () => {
  const { user, isLoaded } = useUser();
  const cld = new Cloudinary({ cloud: { cloudName: "dktw0yum9" } });
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [milestone, setMilestone] = useState("");
  const [image, setImage] = useState(null);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    tags: [],
    projectFile: "",
    experienceLevel: "",
    price: "",
    questions: [],
    milestones: [],
    Clerk_id: user?.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSelectChange = (value) => {
    setProjectData((prev) => ({ ...prev, experienceLevel: value }));
  };

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setProjectData((prev) => ({
        ...prev,
        questions: [...prev.questions, currentQuestion.trim()],
      }));
      setCurrentQuestion("");
    }
  };

  const handleAddMilestones = () => {
    if (milestone.trim()) {
      setProjectData((prev) => ({
        ...prev,
        milestones: [...prev.milestones, milestone.trim()],
      }));
      setMilestone("");
    }
  };

  const uploadImage = async (publicid) => {
    if (!image) return null;
    const path = `images/${publicid}`;
    const success = await uploadFile(image, path);
    return success ? path : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const publicid = user?.id + projectData?.title;
    const uploadedFileUrl = await uploadImage(publicid);

    const finalProjectData = {
      ...projectData,
      projectFile: uploadedFileUrl || "",
      tags: skills, // ✅ Include selected skills
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/project/add",
        finalProjectData
      );

      if (res.data.message === "Project Created") {
        toast.success("Project Created Successfully");
        setProjectData({
          title: "",
          description: "",
          tags: [],
          projectFile: "",
          experienceLevel: "",
          price: "",
          questions: [],
          milestones: [],
          Clerk_id: user?.id,
        });
        setSkills([]);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(input.toLowerCase()) &&
      !skills.includes(skill)
  );

  const addSkill = (skill) => {
    if (!skills.includes(skill) && skills.length < 15) {
      setSkills([...skills, skill]);
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <section>
      <Navigate
        name={"Projects"}
        item={"Create Project"}
        path={"my-projects"}
      />
      <div className="p-6 mx-auto bg-white max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold">Create New Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={projectData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <Label className="block mb-2 text-sm font-medium text-text">
              Skills *
            </Label>
            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type to search skills"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {input && (
                <ul className="mt-1 bg-white border border-gray-300 rounded-md">
                  {filteredSkills.map((skill, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm text-blue-700 transition duration-200 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ✕
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="file">Project Description File</Label>
            <Input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              onValueChange={handleSelectChange}
              className="w-full p-2 border rounded-lg"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={projectData.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="milestones">Create your Milestones</Label>
            <Textarea
              id="milestones"
              name="milestones"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              placeholder="Enter a milestone"
              className="w-full p-2 border rounded-lg"
            />
            <Button
              type="button"
              onClick={handleAddMilestones}
              className="px-4 py-2 mt-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Add Milestone
            </Button>
            {/* Milestones List */}
            {projectData.milestones.length > 0 && (
              <ul className="mt-2">
                {projectData.milestones.map((milestone, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    {milestone}
                    <Button
                      type="button"
                      onClick={() =>
                        setProjectData((prev) => ({
                          ...prev,
                          milestones: prev.milestones.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Label htmlFor="questions">Questions for Applicants</Label>
            <Textarea
              id="questions"
              name="questions"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter a question"
              className="w-full p-2 border rounded-lg"
            />
            <Button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 mt-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Add Question
            </Button>
            {/* Questions List */}
            {projectData.questions.length > 0 && (
              <ul className="mt-2">
                {projectData.questions.map((question, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    {question}
                    <Button
                      type="button"
                      onClick={() =>
                        setProjectData((prev) => ({
                          ...prev,
                          questions: prev.questions.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Create Project
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateProject;
