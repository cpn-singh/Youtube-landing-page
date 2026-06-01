import React from 'react';
import { useAuth } from "../context/AuthProvider";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar2 = () => {
  // 🔑 Connect to global context states
  const { value, setValue } = useAuth();

  // CHANGED: IDs are strings to match AuthProvider value sync state
  const sidebarItems = [
    { id: "New", name: "Home", icon: GoHome },
    { id: "Shorts", name: "Shorts", icon: SiYoutubeshorts },
    { id: "Subscriptions", name: "Subscriptions", icon: MdOutlineSubscriptions },
    { id: "Your Channel", name: "You", icon: FaRegUserCircle }
  ];

  return (
    <div 
      id="youtube-mini-sidebar"
      className="w-full h-full py-2 bg-white select-none overflow-hidden"
    >
      <div className="px-1 space-y-1.5">
        {sidebarItems.map((item) => {
          const isActive = item.id === value;

          return (
            <div
              key={item.id}
              onClick={() => setValue && setValue(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-100 font-medium text-zinc-950"
                  : "hover:bg-gray-50 font-normal text-zinc-700"
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-[10px] tracking-tight text-center">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar2;