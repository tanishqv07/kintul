import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://kintul-production.up.railway.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, password }),
    });

    if (response.ok) {
      navigate("/services");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="border p-2 mt-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mt-2"
      />
      <button onClick={handleLogin} className="px-6 py-2 bg-blue-600 text-white mt-4">
        Login
      </button>
    </div>
  );
};

export default Login;
