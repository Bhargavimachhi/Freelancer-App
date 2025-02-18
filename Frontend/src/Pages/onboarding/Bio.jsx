import React from "react";
import { useUser } from "@clerk/clerk-react";

const Bio = () => {
    const { user, isLoaded } = useUser();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-7xl mx-auto p-6">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6 gap-2">
      <h1 className="text-3xl md:text-4xl font-semibold text-text">
          Great. Now write a bio to tell the world about yourself.
        </h1>
        <p className="text-text mt-2">
           Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later; just make sure you proofread now.
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
      <div className="w-full md:w-1/2 p-6 bg-white rounded-lg border border-border">
        <div className="flex flex-col items-center">
          <img
            className="w-20 h-20 rounded-full border-2 border-btn"
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
          <p className="mt-4 text-gray-600 text-center px-4">
            “Upwork has enabled me to <strong>increase</strong> my rates. I know what I'm bringing to the table and love the feeling of
            being able to help a variety of clients.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
