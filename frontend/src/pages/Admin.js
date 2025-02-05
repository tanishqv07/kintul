import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar"; //  Import Admin Navbar
import { FaCirclePlus, FaMinus} from "react-icons/fa6";
const Admin = () => {
  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTab, setSelectedTab] = useState("users"); // Default tab
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [greetings, setGreetings] = useState("");
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title:"",
    description:"",
    image:null,
  });
useEffect(()=>{
  if(isAuthenticated){
    fetchServices();
  }
},[isAuthenticated])

  
  useEffect(()=>{
    setGreetings(getGreetings())
  },[])
  useEffect(() => {
    if (isAuthenticated) {
      fetchProviders();
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (passkey === "123456") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passkey!");
    }
  };

  const getGreetings = (greetings) =>{
    const hour = new Date().getHours();
    if (hour >= 24 && hour < 12){
        return "☀️ Good Morning, Chief!";
    }
    else if(hour >= 12 && hour < 18){
        return "🌤️ Good Afternoon, Chief!";
    }
    else {
        return "🌙 working late.. 💤💤💤";
    }
  }

  const fetchProviders = async () => {
    try {
      const res = await fetch("https://kintul-production.up.railway.app/api/providers");
      const data = await res.json();
      setProviders(data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://kintul-production.up.railway.app/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await fetch(`https://kintul-production.up.railway.app/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBookings(); 
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
// fetch a list of existing services
const fetchServices = async () => {
  try {
      const response = await fetch("https://kintul-production.up.railway.app/api/services");
      if (!response.ok) throw new Error("Failed to fetch services");

      const data = await response.json();
      setServices(data);
  } catch (error) {
      console.error("Error fetching services:", error);
  }
};
  const handleAddService = async () => {
      if (!newService.title || !newService.description || !newService.image) {
        alert("Please fill all fields including an image.");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", newService.title);
      formData.append("description", newService.description);
      formData.append("image", newService.image);
  
      try {
        const response = await fetch("https://kintul-production.up.railway.app/api/services", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          alert("Service added successfully!");
          setNewService({ title: "", description: "", image: null });
        } else {
          alert("Failed to add service.");
        }
      } catch (error) {
        console.error("Error adding service:", error);
      }
    };
  //deletion
  const deleteService = async (id) => {
    try {
        const response = await fetch(`https://kintul-production.up.railway.app/api/services/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete service");

        alert("Service deleted successfully!");
        fetchServices();
    } catch (error) {
        console.error("Error deleting service:", error);
    }
};


  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="border p-2 mt-2"
          />
          <button onClick={handleLogin} className="px-6 py-2 bg-blue-600 text-white mt-4">
            Login
          </button>
        </div>
      ) : (
        <div className="pb-20">
            <h1 className="text-3xl font-bold text-center mt-5 py-5">{greetings}</h1>
          <div className="p-6">
            {/* Registered Users Section */}
            {selectedTab === "users" && (
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">Registered Providers</h3>
                <ul>
                  {providers.map((provider) => (
                    <li key={provider._id} className="border-b p-2">
                      {provider.name} ({provider.profession}) - {provider.number}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bookings Section */}
            {selectedTab === "bookings" && (
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">Bookings</h3>
                <ul>
                  {bookings.map((booking) => (
                    <li key={booking._id} className="border-b p-2 flex justify-between">
                      <div>
                        <strong>{booking.serviceName}</strong> - {booking.customerName}  
                        <br />
                        <span>Status: {booking.status}</span>
                      </div>
                      <div>
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateBookingStatus(booking._id, "done")}
                              className="px-4 py-1 bg-green-500 text-white rounded-md mx-1"
                            >
                              Mark as Done
                            </button>
                            <button
                              onClick={() => handleUpdateBookingStatus(booking._id, "cancelled")}
                              className="px-4 py-1 bg-red-500 text-white rounded-md"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* New Service Section */}
            {selectedTab === "services" && (
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">Add a New Service</h3>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="border p-2 mt-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="border p-2 mt-2 w-full"
                />
                <input
                  type="file"
                  onChange={(e) => setNewService({ ...newService, image: e.target.files[0] })}
                  className="border p-2 mt-2 w-full"
    />
                <button onClick={handleAddService} className="px-6 py-2 bg-green-600 text-white mt-2">
                  <FaCirclePlus/>
                </button>
                {/**List of services available on plateform */}
                <h3>Existing services</h3>
                <ul className="mt-2">
                  {services.map((service)=>(
                    <li key={service._id} className="border-b py-2 flex justify-between">
                      {service.title}
                      <button onClick={deleteService(service._id)}
                      className="text-red-600 hover:text-red-800">
                        <FaMinus/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Admin Navbar at Bottom */}
          <AdminNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
      )}
    </div>
  );
};

export default Admin;
