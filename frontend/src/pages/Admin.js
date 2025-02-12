import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar"; //  Import Admin Navbar
import { FaCirclePlus, FaDownload, FaMinus} from "react-icons/fa6";
import jsPDF from 'jspdf';
import TimeDisplay from "../components/TimeDisplay";
import { FaRegEye } from "react-icons/fa6";
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
    if (hour >= 0 && hour < 12){
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
      const res = await fetch("https://kintul-production.up.railway.app/api/user/providers")
  
      if (!res.ok) {
        throw new Error(`Failed to fetch providers. Status: ${res.status}`);
      }
  
      const data = await res.json();
      setProviders(data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

//toggle status of the providers
const handleToggleProviderStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await fetch(`https://kintul-production.up.railway.app/api/user/providers/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setProviders(providers.map(p => p._id === id ? { ...p, status: newStatus } : p));
  } catch (error) {
    console.error("Error updating provider status:", error);
  }
};
//convert ImageUrl to Image64
const getBase64Image = async (ImageUrl) =>{
  try{
    const response = await fetch(ImageUrl);
    const blob = await response.blob();

    return new Promise((resolve)=>{
      const reader = new FileReader();
      reader.onloadend = ()=> resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }catch (error) {
    console.error("Error converting image:", error);
    return null;
}
};
//downloadable pdf generator
const handleDownloadPDF = async (provider) =>{
  const doc = new jsPDF();
  doc.text("Provider Details",20,20);
  doc.text(`Name: ${provider.name}`,20,30);
  doc.text(`Address: ${provider.address}`,20,40);
  doc.text(`Contact Number: ${provider.number}`,20,50);
  
  const base64Image = await getBase64Image(provider.aadharCardImage)
 if(!base64Image){
  doc.text("No image found contact provider",20,60);
  console.log(provider.aadharCardImage)
 }
 console.log(provider.aadharCardImage)
 doc.addImage(base64Image,"JPEG",20,60,50,60)
doc.save(`${provider.name}_details.pdf`);
};
  const fetchBookings = async () => {
    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/bookings/all");
      if (!response.ok) throw new Error("Failed to fetch bookings");
  
      const data = await response.json();
      console.log("Fetched Bookings:", data); 
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`https://kintul-production.up.railway.app/api/bookings/admin/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }), 
      });

      if (!response.ok) throw new Error("Failed to update booking");

      
      setBookings((prevBookings) => prevBookings.filter(b => b._id !== id));

      console.log(`Booking ${id} marked as done`);
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
        <div className="flex flex-col bg-gradient-to-b from-red-500 to-black text-red-500 items-center justify-center min-h-screen">
            <FaRegEye className="mb-3 text-white hover:text-black" size={96}/>
          <div className="flex flex-col bg-gray-900 p-10 shadow-md shadow-black rounded-md text-center">
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="border p-2 mt-2 text-red-400"
          />
          <button onClick={handleLogin} className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white mt-4">
            Login
          </button>
          </div>
        </div>
      ) : (
        <div className="pb-20">
            <h1 className="text-3xl font-bold text-center mt-5 py-5">{greetings}</h1>
          <div className="p-6">
            <TimeDisplay/>
            {/* Registered Users Section */}
            {selectedTab === "users" && (
              <div className="p-4 bg-white shadow-md rounded-lg mt-3">
                <h3 className="text-2xl font-semibold">Registered Providers</h3>
                <ul>
  {providers.map((provider) => (
    <li key={provider._id} className="border-b p-2 flex justify-between">
      <div>
        {provider.name} ({provider.profession}) - {provider.number} - {provider.address}
        <br />
        <span className={`font-bold ${provider.status === "active" ? "text-green-600" : "text-red-600"}`}>
          {provider.status}
        </span>
      </div>
      <div className="flex gap-2">
        {/*  Toggle Status Button */}
        <button
          onClick={() => handleToggleProviderStatus(provider._id, provider.status)}
          className={`px-4 py-1 rounded-md hover:bg-red-700 ${
            provider.status === "active" ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {provider.status === "active" ? "Disable" : "Enable"}
        </button>

        {/*  Download PDF Button */}
        <button
          onClick={() => handleDownloadPDF(provider)}
          className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-black"
        >
          <FaDownload/>
        </button>
      </div>
    </li>
  ))}
</ul>
              </div>
            )}

            {/* Bookings Section */}
            {selectedTab === "bookings" && (
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold">Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className={`border-b p-2 flex justify-between 
            ${booking.status === "cancelled" ? "text-red-600 font-bold" : ""}`}>

            <div>
              <strong>{booking.serviceName}</strong> - {booking.customerName}  
              <br />
              <span>Status: {booking.status}</span>
            </div>

            {booking.status === "pending" && (
              <button
                onClick={() => handleUpdateBookingStatus(booking._id)}
                className="px-4 py-1 bg-green-500 text-white rounded-md mx-1"
              >
                Mark as Done
              </button>
            )}
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
                <button onClick={handleAddService} className="px-6 py-2 bg-green-600 text-white mt-2 rounded-full">
                  <FaCirclePlus/>
                </button>
                {/**List of services available on plateform */}
                <h3>Existing services</h3>
                <ul className="mt-2">
                  {services.map((service)=>(
                    <li key={service._id} className="border-b py-2 flex justify-between">
                      {service.title}
                      <button onClick={()=>deleteService(service._id)}
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
