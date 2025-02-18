import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 mx-auto md:flex-row max-w-7xl">
      {/* Left Section */}
      <div className="w-full p-6 md:w-1/2">
        <h1 className="text-3xl font-semibold md:text-4xl text-text">
          Hey {user?.firstName} Ready for your next big opportunity?
        </h1>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-text">👤</span>
            <p className="text-text">
              Answer a few questions and start building your profile
            </p>
          </div>
          <hr />
          <div className="flex items-center space-x-3">
            <span className="text-text">✉️</span>
            <p className="text-text">
              Apply for open roles or list services for clients to buy
            </p>
          </div>
          <hr />
          <div className="flex items-center space-x-3">
            <span className="text-text">🛡️</span>
            <p className="text-text">
              Get paid safely and know we’re there to help
            </p>
          </div>
          <hr />
        </div>
        <Link to="/create-profile/resume-upload">
          <button className="px-6 py-2 mt-6 text-white rounded-lg bg-btn hover:bg-btnhover">
            Get started
          </button>
        </Link>
        <p className="mt-2 text-sm text-gray-500">
          It only takes 5-10 minutes and you can edit it later. We’ll save as
          you go.
        </p>
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
            “Upwork has enabled me to <strong>increase</strong> my rates. I know
            what I'm bringing to the table and love the feeling of being able to
            help a variety of clients.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
