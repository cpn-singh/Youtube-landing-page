import logo from "../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { IoMicOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
  const toggleSidebarMenu = () => {
    const mainSidebar = document.getElementById("youtube-main-sidebar");
    const miniSidebar = document.getElementById("youtube-main-sidebar2");
    const sidebarWrapper = document.getElementById("sidebar-layout-container");
    
if (mainSidebar && miniSidebar && sidebarWrapper) {
    if (mainSidebar.classList.contains("hidden")) {
      // Switch back to wide layout
      mainSidebar.classList.remove("hidden");
      miniSidebar.classList.add("hidden");
      
      //Restores the original wide layout footprint
      sidebarWrapper.classList.remove("w-[5%]");
      sidebarWrapper.classList.add("w-[16%]");
    } else {
      // Switch to mini layout
      mainSidebar.classList.add("hidden");
      miniSidebar.classList.remove("hidden");
      
      //Shrinks the parent footprint so Main Content automatically claims the rest
      sidebarWrapper.classList.remove("w-[16%]");
      sidebarWrapper.classList.add("w-[5%]");
    }
  }
  };
  return (
    <div className="flex justify-between items-center fixed top-0 w-[100%] bg-white px-6 py-2">
      <div className="flex items-center gap-5">
        <AiOutlineMenu className="cursor-pointer text-2xl" onClick={toggleSidebarMenu}/>
        <img className="w-27 cursor-pointer" src={logo} alt="" />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-between gap-1 border-1 border-gray-400 rounded-full w-[40vw]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-96 outline-none px-4"
          />
          <button className="bg-gray-100 border-l-1 border-gray-400 px-4 py-2 rounded-r-full cursor-pointer">
            <IoSearch className="text-2xl" />
          </button>
        </div>
        <div className="bg-gray-100 border-gray-400 rounded-full px-2 py-2 cursor-pointer">
          <IoMicOutline className="text-2xl" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 bg-gray-200 rounded-full px-4 py-1.5 cursor-pointer">
          <IoAddOutline className="text-2xl" />
          <p className="font-semibold">Create</p>
        </div>
        <div className="text-2xl cursor-pointer">
          <FiBell />
        </div>
        <div>
          <div className="w-10 h-10 rounded-full bg-blue-400 cursor-pointer flex items-center justify-center">
            <p className="text-white font-semibold">CN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
