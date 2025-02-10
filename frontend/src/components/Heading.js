import React from "react";

const Heading = ({ text, isNavbarBottom }) => {
  return (
    <h2
      className={`text-3xl font-bold text-center mb-6 py-3 ${
        isNavbarBottom ? "mt-0 py-5" : "mt-20 py-5"
      }`}
    >
      {text}
    </h2>
  );
};

export default Heading;
