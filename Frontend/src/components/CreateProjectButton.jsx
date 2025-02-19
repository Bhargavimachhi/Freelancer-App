
import { useState } from "react"
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label"
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Cloudinary } from "@cloudinary/url-gen";

export default function CreateProjectSection() {
 
  
  const {user,isLoaded} = useUser();
  const cld = new Cloudinary({ cloud: { cloudName: 'dktw0yum9' } });
  
  const initialProjectData = {
    title: "",
    description: "",
    tags: [],
    projectFile: "",
    experienceLevel: "",
    price: "",
    questions: [],
    Clerk_id: user.id,
  };
  

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    tags: [] ,
    projectFile: "" ,
    experienceLevel: "",
    price: "",
    questions: [],
    Clerk_id: user.id

  });
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [url,seturl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProjectData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
    

  const handleSelectChange = (value) => {
    setProjectData((prev) => ({ ...prev, experienceLevel: value }))
  }

  const handleTagChange = (tag) => {
    setProjectData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }
  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setProjectData((prev) => ({
        ...prev,
        questions: [...prev.questions, currentQuestion.trim()],
      }));
      setCurrentQuestion("");
    }
  };
  const uploadImage = async (publicid) => {

   console.log(publicid);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Freelancing website");
    data.append("cloud_name", "dktw0yum9");
    data.append("public_id",publicid);

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dktw0yum9/image/upload", data);
      console.log(response.data);
      seturl(response.data.url);
      return response.data.url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const publicid = user.id + projectData.title;
    const uploadedImageUrl = await uploadImage(publicid);
    console.log("This is the public id: ", publicid);
    console.log("Uploaded Image URL: ", uploadedImageUrl);

    // Use a temporary object to ensure projectFile is updated immediately
    const updatedProjectData = { ...projectData, projectFile: publicid };
    console.log("Updated Project Data:", updatedProjectData);

    try {
        const res = await axios.post("http://localhost:3000/CreateProject", updatedProjectData);
        console.log(res.data);

        if (res.data.message === "Project Created") {
            setIsDialogOpen(false);
            alert("Project Created Successfully");
            setProjectData(initialProjectData);
        }
    } catch (error) {
        console.error("Error creating project:", error);
    }
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full md:w-auto">
            Create Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={projectData.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Tags (Skills)</Label>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Python", "Design", "Writing"].map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={projectData.tags.includes(tag)}
                      onCheckedChange={() => handleTagChange(tag)}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="file">Project Description File</Label>
              <Input id="file" name="file" type="file" onChange={handleFileChange} />
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select onValueChange={handleSelectChange}>
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
              />
            </div>
            <div>
              <Label htmlFor="questions">Questions for Applicants</Label>
              <Textarea
                id="questions"
                name="questions"
                value={currentQuestion}
                onChange={(e)=>{
                  setCurrentQuestion(e.target.value);
                }}
                placeholder="Enter questions separated by new lines"
              />
              <Button type="button" onClick={handleAddQuestion}>Add Question</Button>
            </div>
            <Button type="submit">Create Project</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

