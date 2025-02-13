import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import { FaX } from "react-icons/fa6";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in");
      return;
    }

    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleCancelBooking = async (id) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("You need to log in");
      return;
    }

    try {
      const response = await fetch(`https://kintul-production.up.railway.app/api/bookings/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) throw new Error("Failed to cancel booking");

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );

      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
      <TitleBar />

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto p-10 mt-5 flex flex-col items-center">
        <h2 className={`text-3xl font-bold text-center text-white p-2 mb-2 ${isNavbarBottom?"mt-0":"mt-4"}`}>
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <img src="/assets/noBookings.png" alt="No Bookings" className="w-64 h-64" />
            <p className="text-center text-gray-400 mt-4 text-lg">No bookings found.</p>
            <button
              className="bg-orange-400 text-black px-6 py-2 mt-4 rounded-lg hover:bg-orange-500"
              onClick={() => navigate("/services")}
            >
              Book Now
            </button>
          </div>
        ) : (
          <ul className="bg-gray-900 shadow-orange-400 shadow-md p-4 rounded-lg w-[90%] max-w-2xl mt-8 text-white">
            {bookings.map((booking) => (
              <li key={booking._id} className="border-b p-2 flex justify-between">
                <div>
                  <strong>{booking.serviceName}</strong> - {booking.customerAddress}
                  <br />
                  <span>Status: {booking.status}</span>
                  <p>{formatDate(booking.dateTime)}</p>
                </div>
                {booking.status === "pending" && (
  <button 
    onClick={() => handleCancelBooking(booking._id)} 
    className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full"
  >
    <FaX size={20} />
  </button>
)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bookings;
