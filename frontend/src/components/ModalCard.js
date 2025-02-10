import React from "react";
import { FaX } from "react-icons/fa6";

const ModalCard = ({ service, onClose }) => {
  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to book a service");
      return;
    }

    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: service._id,
          serviceName: service.title,
        }),
      });

      if (!response.ok) throw new Error("Booking failed");
      alert("Booking confirmed!");
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-red-600 hover:text-orange-500 mb-5" onClick={onClose}>
          <FaX size={20} />
        </button>

        {/* Service Details */}
        <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover rounded-sm shadow-sm shadow-gray-500" />
        <h3 className="text-xl font-bold mt-4 text-orange-500">{service.title}</h3>
        <p className="text-white mt-2">{service.description}</p>

        {/* Booking Button */}
        <button onClick={handleBooking} className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-black">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ModalCard;
