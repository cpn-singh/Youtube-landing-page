import React from 'react';
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar2 = () => {
      const [activeId, setActiveId] = useState(1);
      const sidebarItems = [
        { id: 1, name: "Home", icon: GoHome },
        { id: 2, name: "Shorts", icon: SiYoutubeshorts },
        { id: 3, name: "Subscriptions", icon: MdOutlineSubscriptions },
        { id: 4, name: "You", icon: FaRegUserCircle }
      ];
  return (
    <div 
      id="youtube-main-sidebar2"
      className="hidden absolute top-0 left-0 w-full h-full py-2 bg-white select-none overflow-hidden"
    >
      <div className="px-2 space-y-0.5">
        {sidebarItems.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex flex-col justify-center gap-1 px-2 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-200/80 dark:bg-neutral-300 font-medium text-black"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-200/50 font-normal text-zinc-800"
              }`}
            >
              <item.icon className="text-xl mx-auto" />
              <span className="text-[10px] text-center">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar2;