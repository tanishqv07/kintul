import React, { useState, useEffect } from "react";
import { FaRegClock, FaCalendar } from "react-icons/fa6";
const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  // Format the date and time
  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formattedDate = time.toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" });
  const formattedDay = time.toLocaleDateString([], { weekday: "long" });

  return (
    <div className="flex w-full justify-around py-4 bg-gray-950 text-white px-2 rounded-md m-0">
        <FaCalendar size={22}/>
      <h2 className="text-xl font-bold px-4">{formattedDay}</h2>
      <p className="text-lg px-4">{formattedDate}</p>
      <FaRegClock size={24}/>
      <p className="text-xl font-semibold px-4">{formattedTime}</p>
    </div>
  );
};

export default TimeDisplay;
