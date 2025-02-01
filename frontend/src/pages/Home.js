import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Kintul</h1>
      <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md">
        Login
      </Link>
      <Link to="/signup" className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md">
        Sign Up
      </Link>
    </div>
  );
};

export default Home;
