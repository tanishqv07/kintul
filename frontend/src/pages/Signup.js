import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    address: "",
    role: "Customer",
    profileImage: null,
    adhaarCardImage: null, 
  });

  const [services, setServices] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //  Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://kintul-production.up.railway.app/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  //  Handle input change
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //  Validate Inputs
  const validateForm = () => {
    let newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.name)) newErrors.name = "Invalid Name";
    if (!/^\d{10}$/.test(formData.number)) newErrors.number = "Enter valid 10-digit phone number";
    if (formData.role === "Customer" && !/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) newErrors.email = "Invalid Email";
    if (!/(?=.*[A-Z])(?=.*[\W])/.test(formData.password)) newErrors.password = "Must contain 1 uppercase & 1 symbol";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Signup Submission
  const handleSignup = async () => {
    if (!validateForm()) return;

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-orange-400 to-red-700 p-6 text-orange-500">
      {/*  Signup Card */}
      <div className="bg-gray-900 shadow-2xl shadow-black rounded-lg flex flex-col md:flex-row w-full max-w-3xl overflow-hidden">
        
        {/*  Left Section: Image (1/4 width on desktop) */}
        <div className="w-0 md:w-1/4 flex justify-center items-center bg-gray-200 p-0">
          <img src="/assets/signUp.png" alt="Signup" className="w-full h-full rounded-md object-cover" />
        </div>

        {/*Right Section*/}
        <div className="w-full md:w-3/4 p-6">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>

          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 mt-2 w-full bg-inherit border-orange-500 rounded-lg" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input type="text" name="number" placeholder="Phone Number" onChange={handleChange} className="border p-2 mt-2 w-full bg-inherit border-orange-500 rounded-lg" />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}

          <div className="relative w-full">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} className="border p-2 mt-2 w-full bg-inherit border-orange-500 rounded-lg" />
            <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye className="bg-yellow-500 rounded-full"/> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 mt-2 w-full bg-inherit border-orange-500 rounded-lg" />

          <select name="role" onChange={handleChange} className="border p-2 mt-2 w-full">
            <option value="Customer">Customer</option>
            <option value="Provider">Provider</option>
          </select>

          {/*  Email */}
          {formData.role === "Customer" && (
            <>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 mt-2 w-full bg-inherit border-orange-500 rounded-lg" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </>
          )}

          {/* Image Upload */}
          <FileUpload onFileSelect={(file) => setFormData({ ...formData, profileImage: file })} />

          {/* Profession Dropdown for Providers */}
          {formData.role === "Provider" && (
            <select name="profession" onChange={handleChange} className="border p-2 mt-2 w-full bg-inherit border-orange-500 rounded-lg ">
              <option value="">Select Profession</option>
              {services.map((service) => (
                <option key={service._id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          )}

          {/*  Aadhaar Card Upload for Providers */}
          {formData.role === "Provider" && (
            <>
              <FileUpload onFileSelect={(file) => setFormData({ ...formData, adhaarCardImage: file })}  />
            </>
          )}

          {/*  Signup Button */}
          <button onClick={handleSignup} className="px-6 py-2 bg-green-600 text-white mt-4 w-full ">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
