import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearch, IoMicOutline, IoAddOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 1. Core Sidebar Toggle Fix
  const toggleSidebarMenu = () => {
    const mainSidebar = document.getElementById("youtube-main-sidebar");
    const miniSidebar = document.getElementById("youtube-mini-sidebar"); // Fixed ID to match our optimized component
    const sidebarWrapper = document.getElementById("sidebar-layout-container");
    
    if (mainSidebar && miniSidebar && sidebarWrapper) {
      if (mainSidebar.classList.contains("hidden")) {
        // Switch back to wide layout
        mainSidebar.classList.remove("hidden");
        miniSidebar.classList.add("hidden");
        
        // Restores the original layout footprint defined in your Home view
        sidebarWrapper.classList.remove("w-[5%]");
        sidebarWrapper.classList.add("w-[12.4%]");
      } else {
        // Switch to mini layout
        mainSidebar.classList.add("hidden");
        miniSidebar.classList.remove("hidden");
        
        // Shrinks the parent footprint so the main content grid scales up to match
        sidebarWrapper.classList.remove("w-[12.4%]");
        sidebarWrapper.classList.add("w-[5%]");
      }
    }
  };

  // 2. Functional Handler for the Search Interface
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="flex z-50 justify-between items-center fixed top-0 left-0 w-full bg-white px-6 py-2 border-b border-gray-100">
      
      {/* Left Menu & Branding */}
      <div className="flex items-center gap-5">
        <AiOutlineMenu className="cursor-pointer text-2xl text-zinc-700 hover:text-black" onClick={toggleSidebarMenu}/>
        <img className="w-24 cursor-pointer object-contain" src={logo} alt="YouTube Logo" onClick={() => navigate("/")} />
      </div>
      
      {/* Middle Functional Search Input Area */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
        <div className="flex items-center justify-between border border-gray-300 rounded-full w-[40vw] focus-within:border-blue-500 shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 outline-none px-4 text-sm text-zinc-800 placeholder-zinc-400"
          />
          <button type="submit" className="bg-gray-50 border-l border-gray-300 px-6 py-2 hover:bg-gray-100 duration-100 cursor-pointer text-zinc-700 flex items-center justify-center">
            <IoSearch className="text-xl" />
          </button>
        </div>
        
        <div className="bg-gray-50 hover:bg-gray-100 p-2.5 rounded-full cursor-pointer transition-colors duration-100 text-zinc-700">
          <IoMicOutline className="text-xl" />
        </div>
      </form>
      
      {/* Right User Control Blocks */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-full duration-150 cursor-pointer">
          <IoAddOutline className="text-xl text-zinc-800" />
          <p className="font-medium text-sm text-zinc-800">Create</p>
        </div>
        
        <div className="text-xl cursor-pointer p-2 hover:bg-gray-100 rounded-full duration-150 text-zinc-700">
          <FiBell />
        </div>
        
        <div className="pl-1">
          <div className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-150 cursor-pointer flex items-center justify-center shadow-inner">
            <p className="text-white text-xs font-semibold tracking-wide">CN</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;