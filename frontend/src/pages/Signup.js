import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    address: "",
    role: "Customer", // Default role
    profileImage: null,
    adhaarCardImage: null, // Aadhaar card for Provider only
  });
  const [services,setServices] useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchServices = async () =>{
      try{
        const response = await fetch("https://kintul-production.up.railway.app/api/services")
        const data = await response.json();
        setServices(data)
      }catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  })

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSignup = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "adhaarCardImage" && formData.role === "Customer") return;
      if (key === "email" && formData.role === "Provider") return; 
      formDataToSend.append(key, formData[key]);
    });

    const response = await fetch("https://kintul-production.up.railway.app/api/auth/register", {
      method: "POST",
      body: formDataToSend,
    });

    if (response.ok) {
      alert("Signup Successful!");
      navigate("/login");
    } else {
      alert("Signup Failed. Try Again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2 mt-2" />
      <input type="text" name="number" placeholder="Phone Number" onChange={handleChange} className="border p-2 mt-2" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 mt-2" />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 mt-2" />

      <select name="role" onChange={handleChange} className="border p-2 mt-2">
        <option value="Customer">Customer</option>
        <option value="Provider">Provider</option>
      </select>

      {/*  Show Email only for Customers */}
      {formData.role === "Customer" && (
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 mt-2" />
      )}

      <label className="mt-2">Profile Image:</label>
      <input type="file" name="profileImage" onChange={handleChange} className="border p-2 mt-2" />

      {formData.role == "Provider" && (
        <select name="profession" onChange={handleChange} className="border p-2 mt-2">
          <option value="">select profession</option>
          {services.map((service)=>(
            <option key={service._id} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      )}
      {/* Show Aadhaar Card upload only for Providers */}
      {formData.role === "Provider" && (
        <>
          <label className="mt-2">Aadhaar Card Image:</label>
          <input type="file" name="adhaarCardImage" onChange={handleChange} className="border p-2 mt-2" />
        </>
      )}
     
      <button onClick={handleSignup} className="px-6 py-2 bg-green-600 text-white mt-4">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
