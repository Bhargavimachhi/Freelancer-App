import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchFile } from "../../upload.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const CreateProposal = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();

  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [answers, setAnswers] = useState([]);
  const [deliveryTimes, setDeliveryTimes] = useState([]);

  const [projectUrl, setProjectUrl] = useState(null);
  const [publicid, setpublicid] = useState("");
  const [createdBy, setCreatedBy] = useState(null);

  const [Image, setImage] = useState(null);
  const [project, setproject] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const projectid = id;

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const fetchproject = async () => {
      if (userId) {
        let res = await axios.get(
          `http://localhost:3000/project/${projectid}`,
          {
            Clerk_id: userId,
          }
        );
        setproject(res.data.project);

        try {
          const url = await fetchFile(
            `project/${res.data.project._id}/projectfile.jpg`
          );
          console.log(url);
          setProjectUrl(url);
        } catch (err) {
          console.log(err);
        }

        res = await axios.get(
          `http://localhost:3000/user/${res.data.project.createdBy}`
        );
        setCreatedBy(res.data.user);

        // res = await axios.get(
        //   `http://localhost:3000/project/${projectid}/proposals`
        // );
        // let data = res.data.proposals;

        // for (let i = 0; i < data.length; i++) {
        //   res = await axios.get(
        //     `http://localhost:3000/user/${data[i].createdBy}`
        //   );
        //   data[i]["createdBy"] = res.data.user;
        // }
        // setProposals(data);
        setLoading(false);
      }
    };

    fetchproject();

    // return () => chatClient.disconnectUser();
  }, [userId]);

  //   console.log(project);

  const uploadImage = async (publicid) => {
    const data = new FormData();
    data.append("file", Image);
    data.append("upload_preset", "Freelancing website");
    data.append("cloud_name", "dktw0yum9");
    data.append("public_id", publicid);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dktw0yum9/image/upload",
        data
      );
      seturl(response.data.url);
      return response.data.url;
    } catch (err) {
      return null;
    }
  };

  const handleSubmit = async () => {
    const publicid = user.id + project.title;
    const uploadedImageUrl = await uploadImage(publicid);
    setpublicid(publicid);

    try {
      const res = await axios.post(
        `http://localhost:3000/project/${projectid}/add-proposal`,
        {
          description: coverLetter,
          price: bidAmount,
          answers: answers,
          Clerk_id: userId,
          file: publicid,
        }
      );

      // Reset states
      setCoverLetter("");
      setBidAmount("");
      setAnswers([]);
      setDeliveryTimes([]);

      // Show alert
      toast.success("Proposal submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit proposal. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Submit a Proposal</h2>
      <p className="text-gray-600">
        Tell the client why you're the best fit for this project
      </p>

      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cover-letter">
            Describe how you will tackle this project
          </Label>
          <Textarea
            id="cover-letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={6}
            placeholder="Introduce yourself and explain why you're qualified for this project..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bid-amount">Your Bid (INR)</Label>
            <div className="relative">
              <span className="absolute -translate-y-1/2 left-3 top-1/2">
                &#8377;
              </span>
              <input
                id="bid-amount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full h-10 px-3 py-2 pl-8 border rounded-md border-input bg-background"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="file">Flowchart to solve this problem</Label>
          <Input
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        {project?.milestones?.length > 0 && (
          <div className="space-y-2">
            <Label>Milestones</Label>
            {project?.milestones?.map((milestone, index) => (
              <div key={index} className="flex m-0">
                <Label>{`${index + 1} ${milestone}`}</Label>
                <input
                  type="number"
                  placeholder="Enter Number of days needed"
                  value={deliveryTimes[index] || ""}
                  onChange={(e) => {
                    const newDeliveryTimes = [...deliveryTimes];
                    newDeliveryTimes[index] = e.target.value;
                    setAnswers(newDeliveryTimes);
                  }}
                  className="p-2 mb-4 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        )}

        {project?.questions?.length > 0 && (
          <div className="space-y-2">
            <Label>Answer Screening Questions</Label>
            {project?.questions?.map((question, index) => (
              <div key={index} className="mt-4">
                <p className="mb-2 font-medium">{question}</p>
                <Textarea
                  rows={3}
                  placeholder="Your answer..."
                  value={answers[index] || ""}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  required
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <Button onClick={handleSubmit}>Submit Proposal</Button>
      </div>
    </div>
  );
};

export default CreateProposal;
