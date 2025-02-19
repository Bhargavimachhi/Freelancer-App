import OnboardingNavigation from "@/components/OnboardingNavigation";
import React, { useState } from "react";

const Role = () => {
  const [professionalRole, setProfessionalRole] = useState("");

  return (
    // {left section}
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 mx-auto md:flex-row max-w-7xl bg-bg">
        <div className="w-full max-w-2xl p-6 mt-3 mr-3 bg-white rounded-lg ms:w-1/2">
          <h1 className="mb-4 text-3xl font-semibold text-text">
            Got it. Now, add a title to tell the world what you do.
          </h1>
          <p className="mb-4 text-text">
            It’s the very first thing clients see, so make it count. Stand out
            by describing your expertise in your own words.
          </p>
          <label className="block mb-2 font-medium text-text">
            Your professional role
          </label>
          <input
            type="text"
            value={professionalRole}
            onChange={(e) => setProfessionalRole(e.target.value)}
            placeholder="Example: IT & Networking"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btn"
          />
        </div>
        {/* Right Section */}
        <div className="w-full max-w-2xl p-6 mt-3 mr-3 bg-white rounded-lg ms:w-1/2">
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 border-2 border-green-500 rounded-full"
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

export default Role;
