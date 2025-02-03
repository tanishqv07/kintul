import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Search = () => {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isNavbarBottom,setIsNavbarBottom] = useState('false');

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("https://kintul-production.up.railway.app/api/services");
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
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
    <div className="min-h-screen bg-gray-100 px-3">
      <h2 className={`text-3xl font-bold text-center mb-6 ${isNavbarBottom ? "mt-0 py-5":"mt-20 py-5"}`}>Search Services</h2>
      <input
        type="text"
        placeholder="Search for a service..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      {filteredServices.length === 0 ? (
        <p className="text-center">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service._id} className="bg-white shadow-md p-4 rounded-lg">
              <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      )}
      <Navbar setIsNavbarBottom={setIsNavbarBottom}/>
    </div>
  );
};

export default Search;
