import React from "react";
import { FaSpinner, FaCircle, FaStar } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      
      {/* Floating Icons */}
      <div className="relative w-40 h-40 mb-6">
        <FaCircle className="absolute top-0 left-1/4 text-white/50 animate-bounce-slow text-4xl" />
        <FaStar className="absolute top-1/2 left-1/2 text-yellow-300 animate-spin-slow text-5xl" />
        <FaCircle className="absolute bottom-0 right-1/3 text-white/40 animate-bounce-slow text-3xl" />
      </div>

      {/* Main Spinner */}
      <FaSpinner className="text-6xl text-white animate-spin mb-4 drop-shadow-xl" />

      {/* Glowing Text */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 animate-pulse drop-shadow-lg">
        Loading, please wait...
      </h1>
      <p className="text-white/80 text-center max-w-md">
        Hang tight! Your content is on its way.
      </p>

      {/* Tailwind Custom Animation */}
      <style>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
