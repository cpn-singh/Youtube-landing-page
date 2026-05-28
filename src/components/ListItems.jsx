import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ListItems = () => {
  // 1. Create a reference to the scrollable container
  const scrollContainerRef = useRef(null);

  const categories = [
    "All", "Music", "React routers", "Computer programming",
    "Reverberation", "Movie musicals", "India national cricket team",
    "News", "Mixes", "1990s", "Telugu cinema", "Live",
    "Dramedy", "Dubbing", "Indian soap opera", "Cricket",
    "Football", "Learn Coding",
  ];

  // 2. Handle scroll logic
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust how many pixels it slides per click
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    // Relative wrapper container holds both the list and the absolute-positioned buttons
    <div className="relative w-full flex items-center group">
      
      {/* Left Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 z-10 p-2 m-1 bg-white/90 rounded-full shadow-md hover:bg-gray-100 duration-200 cursor-pointer hidden group-hover:block border border-gray-200"
      >
        <FaChevronLeft className="text-gray-600 text-sm" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scroll-smooth w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex space-x-3 flex-nowrap py-2 px-1">
          {/* Note: changed key from category.id to index since categories are strings, not objects */}
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex-none text-[14px] bg-gray-100 hover:bg-gray-200 duration-200 rounded-lg px-2 font-normal text-zinc-950 cursor-pointer border border-transparent whitespace-nowrap active:bg-black active:text-white"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 z-10 p-2 m-1 bg-white/90 rounded-full shadow-md hover:bg-gray-100 duration-200 cursor-pointer hidden group-hover:block border border-gray-200"
      >
        <FaChevronRight className="text-gray-600 text-sm" />
      </button>
    </div>
  );
};

export default ListItems;