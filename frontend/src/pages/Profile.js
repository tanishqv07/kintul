import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [isNavbarBottom,setIsNavbarBottom] = useState('false')

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("https://kintul-production.up.railway.app/api/user/profile");
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
    <div className="min-h-screen bg-gray-100 p-0">
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>
      {user ? (
        <div className="bg-white p-4 shadow-md rounded-lg text-center">
          <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.number}</p>

          <label className="block mt-4">Update Address:</label>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="border p-2 mt-2 w-full"
          />
          <button onClick={handleUpdateAddress} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">
            Update Address
          </button>
        </div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
      <Navbar setIsNavbarBottom={setIsNavbarBottom}/>
    </div>
  );
};

export default Profile;
