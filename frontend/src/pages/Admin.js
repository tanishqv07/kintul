import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar"; //  Import Admin Navbar

const Admin = () => {
  const [passkey, setPasskey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTab, setSelectedTab] = useState("users"); // Default tab
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newService, setNewService] = useState("");
  const [greetings, setGreetings] = useState("");

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
      fetchBookings(); // Refresh bookings list
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleAddService = async () => {
    if (!newService.trim()) return;
    try {
      await fetch("https://kintul-production.up.railway.app/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newService }),
      });
      setNewService("");
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
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
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="border p-2 mt-2"
                />
                <button onClick={handleAddService} className="px-6 py-2 bg-green-600 text-white mt-2">
                  Add Service
                </button>
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
