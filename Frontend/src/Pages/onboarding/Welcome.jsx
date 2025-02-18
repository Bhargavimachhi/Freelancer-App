import React from "react";
import { useUser } from "@clerk/clerk-react";

const Welcome = () => {
    const { user, isLoaded } = useUser();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-7xl mx-auto p-6">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-text">
          Hey  {user?.firstName} Ready for your next big opportunity?
        </h1>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-text">👤</span>
            <p className="text-text">Answer a few questions and start building your profile</p>
          </div>
          <hr />
          <div className="flex items-center space-x-3">
            <span className="text-text">✉️</span>
            <p className="text-text">Apply for open roles or list services for clients to buy</p>
          </div>
          <hr />
          <div className="flex items-center space-x-3">
            <span className="text-text">🛡️</span>
            <p className="text-text">Get paid safely and know we’re there to help</p>
          </div>
          <hr />
        </div>
        <button className="mt-6 bg-btn text-white px-6 py-2 rounded-lg hover:bg-btnhover">
          Get started
        </button>
        <p className="mt-2 text-gray-500 text-sm">
          It only takes 5-10 minutes and you can edit it later. We’ll save as you go.
        </p>
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

export default Welcome;
