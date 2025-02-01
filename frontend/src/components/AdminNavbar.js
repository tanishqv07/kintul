import React from "react";
import { FaUsers, FaClipboardList, FaPlus } from "react-icons/fa6";

const AdminNavbar = ({ selectedTab, setSelectedTab }) => {
  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-evenly fixed bottom-0 w-full">
      <button
        onClick={() => setSelectedTab("users")}
        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition ${
          selectedTab === "users" ? "bg-orange-600" : ""
        }`}
      >
        <FaUsers size={20} />
        <span className="text-sm">Users</span>
      </button>
      <button
        onClick={() => setSelectedTab("bookings")}
        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition ${
          selectedTab === "bookings" ? "bg-orange-600" : ""
        }`}
      >
        <FaClipboardList size={20} />
        <span className="text-sm">Bookings</span>
      </button>
      <button
        onClick={() => setSelectedTab("services")}
        className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition ${
          selectedTab === "services" ? "bg-orange-600" : ""
        }`}
      >
        <FaPlus size={20} />
        <span className="text-sm">New Service</span>
      </button>
    </nav>
  );
};

export default AdminNavbar;
