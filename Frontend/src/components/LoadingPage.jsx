import React from "react";
import Error from "../assets/images/loading.webp";

const LoadinPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
      {/* UFO Image */}
      <img src={Error} alt="UFO beaming cat" className="w-64 md:w-80" />

      {/* Title */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-900 md:text-3xl">
        Output is waiting for you too
      </h1>
    </div>
  );
};

export default LoadinPage;
