import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-950 p-0 flex flex-col items-center">
      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
      <TitleBar />
      <h2 className={`text-3xl font-bold text-center mb-6 ${isNavbarBottom ? "mt-0" : "mt-20"}`}>My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No bookings found.</p>
      ) : (
        <ul className="bg-white shadow-md p-4 rounded-lg w-full max-w-2xl mt-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border-b p-2 flex justify-between">
              <div>
                <strong>{booking.serviceName}</strong> - {booking.customerAddress}
                <br />
                <span>Status: {booking.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
