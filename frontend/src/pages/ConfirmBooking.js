import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
  const [latestBooking, setLatestBooking] = useState(null);
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestBooking();
  }, []);

  const fetchLatestBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in");
      return;
    }

    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/bookings/latest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch booking details");

      const data = await response.json();
      setLatestBooking(data);
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
      <h2 className={`text-3xl font-bold text-center mb-6 ${isNavbarBottom ? "mt-0" : "mt-20"}`}>
        Booking Confirmation
      </h2>

      {latestBooking ? (
        <div className="bg-white shadow-md p-6 rounded-lg max-w-md mx-auto text-center">
          <h3 className="text-xl font-semibold">Your Booking is Confirmed!</h3>
          <p className="text-gray-600">Service: {latestBooking.serviceName}</p>
          <p className="text-gray-600">Status: {latestBooking.status}</p>
          <p className="text-gray-600">Address: {latestBooking.customerAddress}</p>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => navigate("/bookings")}
          >
            View My Bookings
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Fetching booking details...</p>
      )}
    </div>
  );
};

export default ConfirmBooking;
