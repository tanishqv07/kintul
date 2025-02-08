import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import { FaRegClock } from "react-icons/fa6";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in");
        return;
      }

      const response = await fetch("https://kintul-production.up.railway.app/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.log(response, "Error in response");
        return;
      }

      const data = await response.json();
      setUser(data);
      setNewAddress(data.address);
    };

    fetchUser();
  }, []);

  const handleUpdateAddress = async () => {
    await fetch("https://kintul-production.up.railway.app/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: newAddress }),
    });

    setUser((prev) => ({ ...prev, address: newAddress }));
    alert("Address updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-orange-400 flex flex-col items-center p-6">
       <TitleBar/>
      <h2 className={`text-3xl font-bold text-center mb-6 ${isNavbarBottom} text-white`}>My Profile</h2>

      {user ? (
        <div className="bg-gray-900 p-6 shadow-xl shadow-orange-500 rounded-lg flex flex-col md:flex-row items-center md:items-start max-w-4xl w-full">
          {/* Left Section  */}
          <div className="flex justify-center w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={user.profileImage}
              alt="Profile"
              className={` ${isNavbarBottom?"rounded-full w-40 h-40 border-2 border-white":"rounded-none h-36 w-3/4"} shadow-md object-cover`}
            />
          </div>

          {/* Right Section  */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.number}</p>

            <label className="block mt-4 font-medium">Update Address:</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="border p-2 mt-2 w-full rounded-md bg-gray-900 border-orange-500"
            />
            <button
              onClick={handleUpdateAddress}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
              Update Address
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <FaRegClock size={36}/>
        <p className="text-center text-lg">Loading profile...</p>
        </div>
      )}

      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
    </div>
  );
};

export default Profile;
