import React from "react";
import { useUser } from "@clerk/clerk-react";
import OnboardingNavigation from "@/components/OnboardingNavigation";

const Bio = () => {
  const { user, isLoaded } = useUser();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 mx-auto md:flex-row max-w-7xl">
        {/* Left Section */}
        <div className="w-full gap-2 p-6 md:w-1/2">
          <h1 className="text-3xl font-semibold md:text-4xl text-text">
            Great. Now write a bio to tell the world about yourself.
          </h1>
          <p className="mt-2 text-text">
            Help people get to know you at a glance. What work do you do best?
            Tell them clearly, using paragraphs or bullet points. You can always
            edit later; just make sure you proofread now.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <textarea
                rows={5}
                placeholder="Example: I am a professional web developer with over 5 years of experience. I specialize in building websites using React and Node.js."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btn"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full p-6 bg-white border rounded-lg md:w-1/2 border-border">
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 border-2 rounded-full border-btn"
              src="https://placehold.co/400"
              alt="Profile"
            />
            <h2 className="mt-3 text-xl font-semibold">Sasheen M.</h2>
            <p className="text-gray-500">Customer Experience Consultant</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-pink-500">⭐ 5.0</span>
              <span className="text-gray-700">$65.00/hr</span>
              <span className="text-gray-700">14 jobs</span>
            </div>
            <p className="px-4 mt-4 text-center text-gray-600">
              “Upwork has enabled me to <strong>increase</strong> my rates. I
              know what I'm bringing to the table and love the feeling of being
              able to help a variety of clients.”
            </p>
          </div>
        </div>
      </div>
      <OnboardingNavigation />
    </>
  );
};

export default Bio;
