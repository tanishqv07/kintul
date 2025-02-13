import React from "react";

const GrossData = ({ bookings = [] }) => {  
  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 text-center">
        <h3 className="text-lg font-mono text-white">No Booking Data Available</h3>
      </div>
    );
  }

  const totalBookings = bookings.length;
  const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
  const revenue = bookings.filter(b => b.status === "done").length * 50;

  return (
    <div className="bg-gray-950 text-orange-400  p-4 rounded-lg shadow-md mt-4 flex justify-between text-center mb-5">
      <div className="w-1/3">
        <h3 className="text-lg font-semibold">Total Bookings</h3>
        <p className="text-2xl text-white">{totalBookings}</p>
      </div>
      <div className="w-1/3">
        <h3 className="text-lg font-semibold">Cancelled</h3>
        <p className="text-2xl text-red-500">{cancelledBookings}</p>
      </div>
      <div className="w-1/3">
        <h3 className="text-lg font-semibold">Revenue (₹)</h3>
        <p className="text-2xl text-green-400">{revenue}.00</p>
      </div>
    </div>
  );
};

export default GrossData;
