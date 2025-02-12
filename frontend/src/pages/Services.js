import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import { FaCirclePlus, FaMessage } from "react-icons/fa6";
import ModalCard from "../components/ModalCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Provider") {
      navigate("/providerDashboard");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await fetch("https://kintul-production.up.railway.app/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("https://kintul-production.up.railway.app/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        
        // Extract unique bookings by serviceId
        const uniqueBookings = [];
        const seenServices = new Set();

        data.forEach((booking) => {
          if (!seenServices.has(booking.serviceId)) {
            seenServices.add(booking.serviceId);
            uniqueBookings.push(booking);
          }
        });

        setRecentBookings(uniqueBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchServices();
    fetchUserBookings();
  }, [navigate]);

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="relative min-h-screen bg-gray-950 p-0 text-white">
      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
      <TitleBar className="fixed top-0 left-0 w-full z-50" />
      
      {/* Heading component */}
      <h2 className={`text-3xl font-bold text-center mb-6 py-3 text-orange-500 ${isNavbarBottom ? "mt-0 py-5" : "mt-20 py-5"}`}>
        Available Services
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-6 px-4 z-0 relative">
        {services.map((service) => (
          <div key={service._id} className="relative bg-gray-900 shadow-md rounded-lg overflow-hidden">
            <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover" />
            <button
              className="absolute bottom-2 right-2 bg-orange-500 text-gray-900 p-2 rounded-full shadow-md hover:bg-orange-600 transition"
              onClick={() => setSelectedService(service)}
            >
              <FaCirclePlus size={24} />
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Carousels */}
      <div className="md:hidden px-4">
        {/* Recent Bookings */}
        {/* Recent Bookings */}
{recentBookings.length > 0 && (
  <>
    <h3 className="text-xl font-semibold mt-6 mb-3">Recent Bookings</h3>
    <Slider {...carouselSettings}>
      {recentBookings.map((booking) => {
        const service = services.find((s) => s._id === booking.serviceId);
        return service ? (
          <div key={booking.serviceId} className="p-2 relative">
            <div className="bg-gray-900 shadow-md rounded-full overflow-hidden">
              <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover" />
              <div className=" flex flex-col items-center">
              <h4 className="text-center font-semibold ">{service.title}</h4>
              <button
                className=" bottom-2 right-2 bg-transparent text-orange-500 p-1 rounded-full hover:opacity-70 transition"
                onClick={() => setSelectedService(service)}
              >
                <FaCirclePlus size={24} />
              </button>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </Slider>
  </>
)}


        {/* New Services */}
        <h3 className="text-xl font-semibold mt-6 mb-3">New Services</h3>
        <Slider {...carouselSettings}>
          {services.map((service) => (
            <div key={service._id} className="p-2">
              <div className="relative bg-gray-900 shadow-md rounded-lg overflow-hidden">
                <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover" />
                <div className="flex justify-around">
                <h4 className="text-center font-semibold ">{service.title}</h4>
                <button
                  className=" bg-transparent text-orange-500 p-2 rounded-full hover:bg-gray-500 transition"
                  onClick={() => setSelectedService(service)}
                >
                  <FaCirclePlus size={24} />
                </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center py-8 bg-black">
        <p>for support contact us at <FaMessage/> kintul@gmail.com</p>
      </div>
      {/* Modal (Shows when a service is selected) */}
      {selectedService && <ModalCard service={selectedService} onClose={() => setSelectedService(null)} />}
    </div>
  );
};

export default Services;
