import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className=" p-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
    >
      <FaPowerOff/>
    </button>
  );
};

export default LogoutButton;
