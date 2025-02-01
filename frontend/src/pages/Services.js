import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("https://kintul-production.up.railway.app/api/services");
      const data = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    
      <h2 className="text-3xl font-bold text-center mb-6">Available Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white shadow-md p-4 rounded-lg">
            <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Book Now</button>
            
          </div>
        ))}
      </div>
      <Navbar className="absolute bottom-0"/>
    </div>
  );
};

export default Services;
