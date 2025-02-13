import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import TitleBar from "../components/TitleBar";
import TimeDisplay from "../components/TimeDisplay";
import LogoutButton from "../components/LogoutButton";
const ProviderDashboard = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in");
        return;
      }

      try {
        const response = await fetch("https://kintul-production.up.railway.app/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        //console.log("Provider Data:", data);
        setUser(data);
        setNewAddress(data.address || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateAddress = async () => {
    const token = localStorage.getItem("token");
    await fetch("https://kintul-production.up.railway.app/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address: newAddress }),
    });

    setUser((prev) => ({ ...prev, address: newAddress }));
    alert("Address updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <TitleBar/>

      <h2 className="text-3xl font-bold mb-6 text-center">Provider Dashboard</h2>
      <div>
        <TimeDisplay className=""/>
      </div>
      {user ? (
        <div className="bg-gray-900 p-6 shadow-md shadow-orange-400 rounded-lg flex flex-col md:flex-row items-center md:items-start w-full max-w-4xl">
          {/* Left Section: Profile Image (Desktop) */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-md shadow-md shadow-white"
            />
          </div>

          {/* Right Section: Details */}
          <div className="flex flex-col w-full md:w-2/3 text-center md:text-left md:pl-8">
            <h3 className="text-3xl font-semibold mb-5 pl-3 pt-2 text-orange-400">{user.name}</h3>
            <p className=" flex items-center justify-center md:justify-start">
              <FaPhone className="mr-2 text-orange-600" /> {user.number}
            </p>
            <p className=" flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-2 text-orange-600" /> {user.address}
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2 text-orange-600" /> Profession: {user.profession}
            </p>

            {/* Update Address */}
            <div className="mt-4">
              <label className="block font-medium text-orange-400">Update Address:</label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="border border-orange-400 p-2 mt-2 w-full rounded-md bg-gray-900"
              />
              <button
                onClick={handleUpdateAddress}
                className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Update Address
              </button>
            </div>

            {/* Ask Payment Button */}
            <div className="mt-6">
              <button
                className="px-6 py-2 mb-3 bg-orange-500 text-white rounded-md hover:bg-orange-700"
                onClick={() => window.open("https://external-payment.com", "_blank")}
              >
                Ask Payment
              </button>
            </div>
          </div>
          <LogoutButton/>
        </div>
      ) : (
        <h3 className="text-lg text-center mt-6">Loading details...</h3>
      )}

      {/* Footer - Single Line */}
      <footer className="mt-10 text-gray-300 text-center">
        <p className="flex justify-center items-center space-x-4 text-sm">
          <span className="flex items-center"><FaEnvelope className="mr-1" /> support@kintul.com</span>
          <span className="flex items-center"><FaPhone className="mr-1" /> +91 98765 43210</span>
        </p>
      </footer>
    </div>
  );
};

export default ProviderDashboard;
