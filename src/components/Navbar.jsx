import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearch, IoMicOutline, IoAddOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({sidebarOpen,setSidebarOpen}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
const toggleSidebarMenu = () => {
  setSidebarOpen(!sidebarOpen);
};

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex h-14 z-50 justify-between items-center fixed top-0 left-0 w-full bg-white px-3 md:px-6 border-b border-gray-100 select-none">
      
      {/* LEFT SECTION: Hamburger Menu Trigger, Branding */}
      <div className="flex items-center gap-1 md:gap-5">
        <div 
          onClick={toggleSidebarMenu}
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer duration-150 flex items-center justify-center"
        >
          <AiOutlineMenu className="text-xl text-zinc-700 hover:text-black" />
        </div>
        
        <img 
          className="w-20 md:w-24 cursor-pointer object-contain ml-1 sm:ml-0" 
          src={logo} 
          alt="YouTube Logo" 
          onClick={() => navigate("/")} 
        />
      </div>
      
      {/* MIDDLE SECTION: Search Controls */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 md:gap-4 flex-1 max-w-[600px] justify-end sm:justify-center px-2">
        <div className="hidden sm:flex items-center justify-between border border-gray-300 rounded-full w-full focus-within:border-blue-500 shadow-inner overflow-hidden h-9">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 outline-none px-4 text-xs md:text-sm text-zinc-800 placeholder-zinc-400"
          />
          <button 
            type="submit" 
            className="bg-gray-50 border-l border-gray-300 px-5 h-full hover:bg-gray-100 duration-100 cursor-pointer text-zinc-700 flex items-center justify-center shadow-sm"
          >
            <IoSearch className="text-lg" />
          </button>
        </div>
        
        <div className="sm:hidden p-2.5 hover:bg-gray-100 rounded-full cursor-pointer text-zinc-700">
          <IoSearch className="text-xl" />
        </div>

        <div className="bg-gray-50 hover:bg-gray-100 p-2 md:p-2.5 rounded-full cursor-pointer transition-colors duration-100 text-zinc-700 hidden sm:block">
          <IoMicOutline className="text-lg md:text-xl" />
        </div>
      </form>
      
      {/* RIGHT SECTION: Profile and Controls */}
      <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-shrink-0">
        <div className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 p-2 sm:px-4 sm:py-1.5 rounded-full duration-150 cursor-pointer">
          <IoAddOutline className="text-xl text-zinc-800" />
          <p className="font-medium text-sm text-zinc-800 hidden sm:block">Create</p>
        </div>
        
        <div className="text-xl cursor-pointer p-2 hover:bg-gray-100 rounded-full duration-150 text-zinc-700">
          <FiBell />
        </div>
        
        <div className="pl-1 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-150 cursor-pointer flex items-center justify-center shadow-inner">
            <p className="text-white text-xs font-semibold tracking-wide uppercase">CN</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;