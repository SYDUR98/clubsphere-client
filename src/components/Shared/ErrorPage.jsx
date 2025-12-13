import React from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-white p-6">
      <FaExclamationTriangle className="text-8xl mb-6 animate-pulse" />
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-center">Oops! Page Not Found</h2>
      <p className="text-center mb-6 max-w-md">
        The page you are looking for does not exist or has been moved. Check the URL or return home.
      </p>
      <Link
        to="/"
        className="btn flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:brightness-110 transition-all text-black font-semibold px-6 py-3 rounded-lg"
      >
        <FaHome /> Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
