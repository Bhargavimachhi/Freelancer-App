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
import Navigate from "@/helpers/Navigate.jsx";
import LoadingPage from "@/components/LoadingPage.jsx";

const CreateProposal = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();

  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [answers, setAnswers] = useState([]);
  const [deliveryTimes, setDeliveryTimes] = useState([]);

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

        // try {
        //   const url = await fetchFile(
        //     `project/${res.data.project._id}/projectfile.jpg`
        //   );
        //   console.log(url);
        //   setProjectUrl(url);
        // } catch (err) {
        //   console.log(err);
        // }

        setLoading(false);
      }
    };

    fetchproject();

    // return () => chatClient.disconnectUser();
  }, [userId]);

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

    try {
      const res = await axios.post(
        `http://localhost:3000/project/${projectid}/add-proposal`,
        {
          description: coverLetter,
          price: bidAmount,
          answers: answers,
          milestonesRequiredTime: deliveryTimes,
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

  if (loading) {
    <LoadingPage />;
  }

  return (
    <main>
      <Navigate name={"Project"} item={project?.title} path={`project/${id}`} />
      <div className="p-8 mx-auto bg-white max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800">Submit a Proposal</h2>
        <p className="mb-6 text-gray-600">
          Tell the client why you're the best fit for this project
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="cover-letter" className="font-semibold">
              Describe how you will tackle this project
            </Label>
            <Textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              placeholder="Introduce yourself and explain why you're qualified for this project..."
              className="border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="bid-amount" className="font-semibold">
                Your Bid (INR)
              </Label>
              <div className="relative">
                <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
                  &#8377;
                </span>
                <Input
                  id="bid-amount"
                  type="number"
                  value={bidAmount}
                  placeholder={`Ex.₹ 1000 `}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-8 border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="file" className="font-semibold">
                Upload Flowchart to Solve this Problem
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                className="border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
              />
            </div>
          </div>

          {project?.milestones?.length > 0 && (
            <div className="space-y-4">
              <Label className="font-semibold">Milestones</Label>
              {project.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <Label>{`${index + 1}. ${milestone}`}</Label>
                  <Input
                    type="number"
                    placeholder="Enter days needed"
                    value={deliveryTimes[index] || ""}
                    onChange={(e) => {
                      const newDeliveryTimes = [...deliveryTimes];
                      newDeliveryTimes[index] = e.target.value;
                      setDeliveryTimes(newDeliveryTimes);
                    }}
                    className="border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {project?.questions?.length > 0 && (
            <div className="space-y-4">
              <Label className="font-semibold">
                Answer Screening Questions
              </Label>
              {project.questions.map((question, index) => (
                <div key={index} className="mt-4">
                  <p className="mb-2 font-medium text-gray-700">{question}</p>
                  <Textarea
                    rows={3}
                    placeholder="Your answer..."
                    value={answers[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    className="border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                    required
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-start mt-6">
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 text-white transition-all rounded-lg bg-btn"
          >
            Submit Proposal
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreateProposal;
