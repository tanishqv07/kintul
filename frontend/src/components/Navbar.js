import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBookmark, FaMagnifyingGlass, FaUsers } from "react-icons/fa6";

const Navbar = ({setIsNavbarBottom}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoverStyle, setHoverStyle] = useState({ left: "0vw", width: "25vw" });

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView)
      setIsNavbarBottom(mobileView)
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsNavbarBottom]);

  const handleHover = (left) => {
    setHoverStyle({ left, width: "25vw" }); // Always 25% width
  };

  return (
    <nav
      className={`bg-gray-900 text-white flex justify-around items-center p-4 z-50 shadow-lg ${
        isMobile ? "fixed bottom-0 w-full" : "fixed top-0 w-full"
      }`}
    >
      {/* Hover Effect - Dynamic with `vw` */}
      <div
        className="absolute top-0 h-full transition-all duration-300 ease-in-out"
        style={{
          left: hoverStyle.left,
          width: hoverStyle.width,
          height: "100%",
          background: "linear-gradient(45deg,#4f1919, #ff3333)",
          borderRadius: "8px",
        }}
      ></div>

      {/* Navbar Links */}
      <Link
        to="/services"
        className="relative flex flex-col items-center px-4 py-2 w-1/4 text-center"
        onMouseEnter={() => handleHover("0vw")}
      >
        <FaUsers size={22} />
        Services
      </Link>
      <Link
        to="/search"
        className="relative flex flex-col items-center px-4 py-2 w-1/4 text-center"
        onMouseEnter={() => handleHover("25vw")}
      >
        <FaMagnifyingGlass size={22} />
        Search
      </Link>
      <Link
        to="/bookings"
        className="relative flex flex-col items-center px-4 py-2 w-1/4 text-center"
        onMouseEnter={() => handleHover("50vw")}
      >
        <FaBookmark size={22} />
        Bookings
      </Link>
      <Link
        to="/profile"
        className="relative flex flex-col items-center px-4 py-2 w-1/4 text-center"
        onMouseEnter={() => handleHover("75vw")}
      >
        <FaUser size={22} />
        My Account
      </Link>
    </nav>
  );
};

export default Navbar;
