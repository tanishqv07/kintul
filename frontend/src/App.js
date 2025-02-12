import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import Bookings from "./pages/Bookings";
import ConfirmBooking from "./pages/confirmBooking.js";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ProviderDashboard from "./pages/ProviderDashboard.js";
import ForgotPassword from "./pages/FogotPassword.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/providerDashboard" element={<ProviderDashboard/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
