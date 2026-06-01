import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";

const ListItems = () => {
  const scrollContainerRef = useRef(null);
  const { value, setValue } = useAuth();

  const categories = [
    "All", "Music", "React routers", "Computer programming",
    "Reverberation", "Movie musicals", "India national cricket team",
    "News", "Mixes", "1990s", "Telugu cinema", "Live",
    "Dramedy", "Dubbing", "Indian soap opera", "Cricket",
    "Football", "Learn Coding",
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="relative w-full flex items-center group bg-white">
      
      {/* Left Slider Trigger Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 z-10 p-2 m-1 bg-white/95 rounded-full shadow-md hover:bg-gray-100 duration-200 cursor-pointer hidden group-hover:block border border-gray-200"
      >
        <FaChevronLeft className="text-gray-600 text-sm" />
      </button>

      {/* Horizontal Tag Runner Track */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scroll-smooth w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex space-x-3 flex-nowrap py-2 px-1">
          {categories.map((category, index) => {
            const isActive = category === value || (category === "All" && value === "New");

            return (
              <button
                key={index}
                onClick={() => setValue(category === "All" ? "New" : category)}
                className={`flex-none text-[14px] duration-150 rounded-lg px-3 py-1 font-normal cursor-pointer whitespace-nowrap text-sm ${
                  isActive
                    ? "bg-zinc-900 text-white font-medium shadow-sm"
                    : "bg-gray-100 text-zinc-950 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Slider Trigger Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 z-10 p-2 m-1 bg-white/95 rounded-full shadow-md hover:bg-gray-100 duration-200 cursor-pointer hidden group-hover:block border border-gray-200"
      >
        <FaChevronRight className="text-gray-600 text-sm" />
      </button>
    </div>
  );
};

export default ListItems;