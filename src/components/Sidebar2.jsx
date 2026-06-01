import React from 'react';
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom"; 
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar2 = () => {
  const { value, setValue } = useAuth();
  const navigate = useNavigate(); 

  const sidebarItems = [
    { id: "New", name: "Home", icon: GoHome, type: "home" },
    { id: "Shorts", name: "Shorts", icon: SiYoutubeshorts, type: "search" },
    { id: "Subscriptions", name: "Subscriptions", icon: MdOutlineSubscriptions, type: "search" },
    { id: "Your Channel", name: "You", icon: FaRegUserCircle, type: "search" }
  ];

  const handleItemClick = (item) => {
    setValue(item.id);
    if (item.type === "home") {
      navigate("/");
    } else {
      navigate(`/search/${encodeURIComponent(item.id)}`);
    }
  };

  return (
    <div 
      id="youtube-mini-sidebar"
      className="w-full h-full py-2 bg-white select-none overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
    >
      <div className="px-1 space-y-1 md:space-y-2">
        {sidebarItems.map((item) => {
          const isActive = item.id === value;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 md:py-3.5 px-0.5 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-100 font-medium text-zinc-950"
                  : "hover:bg-gray-50 font-normal text-zinc-700"
              }`}
            >
              <item.icon className="text-lg md:text-xl flex-shrink-0" />
              <span className="text-[9px] md:text-[10px] tracking-tighter text-center w-full truncate px-0.5">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar2;