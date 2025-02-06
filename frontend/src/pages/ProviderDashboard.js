import React, { useState } from "react";

const ProviderDashboard = () => {
  const [newAddress, setNewAddress] = useState("");

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

    alert("Address updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold">Provider Dashboard</h2>

      {/* ✅ Update Address */}
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

      {/* ✅ Ask Payment Button */}
      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-600 text-white"
          onClick={() => window.open("https://external-payment.com", "_blank")}
        >
          Ask Payment
        </button>
      </div>

      {/* ✅ Footer: Contact Details */}
      <footer className="mt-10 text-center text-gray-600">
        <p>Contact Kintul Support</p>
        <p>Email: support@kintul.com</p>
        <p>Phone: +91 98765 43210</p>
      </footer>
    </div>
  );
};

export default ProviderDashboard;
