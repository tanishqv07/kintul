import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-950 text-white">
      
      {/* ✅ Image Section */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          src="/assets/k.png"
          alt="Kintul"
          className="w-full h-full object-cover"
        />
      </div>

      {/*Content Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        
        {/* Mobile Logo */}
        <img
          src="/assets/k.png"
          alt="Kintul"
          className="w-21 h-21 mb-4 rounded-xl md:hidden shadow-lg shadow-orange-600" 
        />

        <h1 className="text-[5rem] font-bold mb-[5rem] text-center">Welcome</h1>
        
        <div className="flex flex-col gap-4 w-2/5 max-w-sm">
          <Link to="/login" 
          className="px-6 py-2 bg-orange-400 text-white font-bold rounded-md text-center hover:animate-bounce">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-white text-black rounded-md text-center border-4 border-orange-400 hover:animate-bounce">
            Sign Up
          </Link>
        </div>
        </div>
      </div>

    
  );
};

export default Home;
