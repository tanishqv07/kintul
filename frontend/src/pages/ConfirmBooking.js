import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ConfirmBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("https://kintul-production.up.railway.app/api/bookings");
      const data = await response.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    await fetch(`https://kintul-production.up.railway.app/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    setBookings(bookings.map(b => b._id === id ? { ...b, status: "cancelled" } : b));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      <h2 className={`text-3xl font-bold text-center mb-6 ${isNavbarBottom}`}>Booking Confirmation</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
              <div>
                <strong>{booking.serviceName}</strong> - {booking.status}
                <br />
                {booking.status === "pending" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
    </div>
  );
};

export default ConfirmBooking;
