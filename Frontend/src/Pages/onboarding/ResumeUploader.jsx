import axios from "axios";
import React, { useState } from "react";
import OnboardingNavigation from "@/components/OnboardingNavigation";

const ResumeUploader = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  //   const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await axios.post(
        `your backend url`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   const data = await response.json();
      //   setResumeUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-6 md:p-12">
        <h2 className="mb-4 text-2xl font-semibold text-center md:text-3xl">
          How would you like to tell us about yourself?
        </h2>
        <p className="max-w-lg mb-6 text-center text-text">
          We need to get a sense of your education, experience, and skills. It’s
          quickest to import your information — you can edit it before your
          profile goes live.
        </p>
        <div className="flex flex-col w-full max-w-md gap-4">
          <button className="w-full py-2 border rounded-lg border-btn text-btn hover:bg-bg">
            Import from LinkedIn
          </button>
          <label className="w-full py-2 text-center border rounded-lg cursor-pointer border-btn text-btn hover:bg-bg">
            <input type="file" className="hidden" onChange={handleUpload} />
            Upload your resume
          </label>
          {resumeUrl && (
            <p className="text-sm text-center text-btn">
              Resume uploaded successfully!
            </p>
          )}
          <button className="w-full py-2 border rounded-lg border-btn text-btn hover:bg-bg">
            Fill out manually (15 min)
          </button>
        </div>
        <div className="max-w-md p-4 mt-6 text-center bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            Your Freelancer App profile is how you stand out from the crowd.
            It’s what you use to win work, so let’s make it a good one.
          </p>
          <p className="mt-2 text-sm text-gray-500">Freelancer App Pro Tip</p>
        </div>
      </div>
      <OnboardingNavigation />
    </>
  );
};

export default ResumeUploader;
