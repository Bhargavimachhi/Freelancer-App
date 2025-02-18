import React, { useState } from "react";

const Role = () => {
  const [professionalRole, setProfessionalRole] = useState("");
  
  return (
    // {left section}
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-7xl mx-auto p-6 bg-bg">
      <div className="w-full ms:w-1/2 max-w-2xl p-6 bg-white rounded-lg mr-3 mt-3">
        <h1 className="text-3xl font-semibold text-text mb-4">
          Got it. Now, add a title to tell the world what you do.
        </h1>
        <p className="text-text mb-4">
          It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words.
        </p>
        <label className="block text-text font-medium mb-2">Your professional role</label>
        <input
          type="text"
          value={professionalRole}
          onChange={(e) => setProfessionalRole(e.target.value)}
          placeholder="Example: IT & Networking"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-btn"
        />
      </div>
      {/* Right Section */}
      <div className="w-full ms:w-1/2 p-6 max-w-2xl bg-white rounded-lg mr-3 mt-3">
        <div className="flex flex-col items-center">
          <img
            className="w-20 h-20 rounded-full border-2 border-green-500"
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

export default Role;
