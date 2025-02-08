import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaTimes } from "react-icons/fa"; // ❌ Import the 'X' icon
import TitleBar from "../components/TitleBar";

const Search = () => {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isNavbarBottom, setIsNavbarBottom] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://kintul-production.up.railway.app/api/services");
        if (!response.ok) throw new Error("Failed to fetch services");

        const data = await response.json();
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [query, services]);

  return (
    <div className="min-h-screen bg-gray-950 px-3 flex flex-col items-center">
      <TitleBar/>
      {/* Page Heading */}
      <h2 className={`text-3xl font-bold text-center text-white mb-6 ${isNavbarBottom ? "mt-0 py-5" : "mt-20 py-5"}`}>
        Search Services
      </h2>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search for a service..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full max-w-lg bg-gray-900 text-white border-orange-500 rounded-md focus:outline-none"
      />

      {/* No Services Found */}
      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <FaTimes className="text-red-500 text-6xl mb-4" /> {/* ❌ Large Red Cross Icon */}
          <p className="text-center text-gray-300 text-lg">No services found.</p>
        </div>
      ) : (
        //  Responsive Grid Layout for Services
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6 w-full max-w-6xl px-1">
          {filteredServices.map((service) => (
            <div key={service._id} className="bg-white shadow-md p-4 rounded-lg">
              <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Navbar */}
      <Navbar setIsNavbarBottom={setIsNavbarBottom} />
    </div>
  );
};

export default Search;
