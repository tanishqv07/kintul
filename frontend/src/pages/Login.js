import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://kintul-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, password }),
      });

      if (!response.ok) {
        setShowForgotPassword(true); // Show forgot password link if login fails
        alert("Invalid credentials!");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "Provider") {
        navigate("/providerDashboard");
      } else {
        navigate("/services");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/loginBackground.png')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex flex-col bg-gray-900 p-10 shadow-xl rounded-md w-96">
        <h2 className="text-2xl font-bold text-center text-orange-500">Login</h2>
        <input
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border p-2 mt-4"
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mt-2 w-full"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye className="text-orange-500" /> : <FaEyeSlash />}
          </button>
        </div>
        <button onClick={handleLogin} className="px-6 py-2 bg-blue-600 text-white mt-4">
          Login
        </button>

        {/* Show Forgot Password Link Only After Incorrect Login */}
        {showForgotPassword && (
          <p className="mt-2 text-sm text-red-500 text-center">
            Forgot password?{" "}
            <Link to="/forgot-password" className="text-blue-600 underline">
              Click here
            </Link>
          </p>
        )}

        {/* Admin Login Link */}
        <p className="mt-4 text-gray-600 text-center">
          Are you an admin?{" "}
          <Link to="/admin" className="text-blue-600 underline">
            Click here to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
