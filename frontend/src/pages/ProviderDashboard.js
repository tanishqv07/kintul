import React, { useState, useEffect } from "react";

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        console.log("Provider Data:", data); // ✅ Debugging
        setUser(data);
        setNewAddress(data.address || ""); // ✅ Set current address
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Provider Dashboard</h2>

      {/* Show Profile Data */}
      {user ? (
        <div className="bg-white p-4 shadow-md rounded-lg text-center">
          <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">📞 {user.number}</p>
          <p className="text-gray-600">🏠 {user.address}</p>
          <p className="text-gray-600">👨‍🔧 Profession: {user.profession}</p>
                {/*  Update Address */}
      <div className="mt-4">
        <label className="block">Update Address:</label>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border p-2 mt-2 w-full"
        />
        <button onClick={handleUpdateAddress} className="mt-2 px-6 py-2 bg-blue-600 text-white">
          Update Address
        </button>
      </div>

      {/*  Ask Payment Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-600 text-white"
          onClick={() => window.open("https://external-payment.com", "_blank")}
        >
          Ask Payment
        </button>
      </div>
        </div>
      ) : (
        <h3>Loading details...</h3>
      )}



      {/* Footer: Contact Details */}
      <footer className="mt-10 text-center text-gray-600">
        <p>Contact Kintul Support</p>
        <p>Email: support@kintul.com</p>
        <p>Phone: +91 98765 43210</p>
      </footer>
    </div>
  );
};

export default ProviderDashboard;
