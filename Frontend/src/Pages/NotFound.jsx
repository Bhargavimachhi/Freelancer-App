import React from "react";
import { Link } from "react-router-dom";
import Error from "../assets/images/notfound.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
      {/* UFO Image */}
      <img src={Error} alt="UFO beaming cat" className="w-64 md:w-80" />

      {/* Title */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-900 md:text-3xl">
        Looking for something?
      </h1>

      {/* Description */}
      <p className="max-w-md mt-2 text-sm text-gray-600 md:text-base">
        We can't find this page. But we can help you find new opportunities:{" "}
        <span className="font-medium cursor-pointer text-btn hover:underline">
          Hire talent
        </span>
        ,{" "}
        <span className="font-medium cursor-pointer text-btn hover:underline">
          Find work
        </span>{" "}
        or{" "}
        <span className="font-medium cursor-pointer text-btn hover:underline">
          Get help
        </span>
        .
      </p>

      {/* Go to Homepage Button */}
      <Link to="/">
        <button className="px-6 py-2 mt-6 text-sm text-white transition-all rounded-full bg-btn hover:bg-btnhover md:text-base">
          Go to homepage
        </button>
      </Link>

      {/* Error Details */}
      <p className="mt-6 text-xs text-text">
        Error 404 (BFG) <br />
        Request ID: 913431f5e11b3e58-PDX
      </p>

      {/* Footer */}
      <p className="mt-4 text-xs text-text">
        &copy; 2015 - {new Date().getFullYear()} Freelancer App&reg; Global Inc.
      </p>
    </div>
  );
};

export default NotFound;
