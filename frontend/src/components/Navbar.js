import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-around">
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
};

export default Navbar;
