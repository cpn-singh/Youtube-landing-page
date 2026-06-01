import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom"; 
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import {
  SiYoutubekids,
  SiYoutubemusic,
  SiYoutubestudio,
  SiTrendmicro,
  SiYoutubegaming,
  SiStylelint,
} from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight, PiLightbulbLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { GiLinkedRings, GiDiamondTrophy } from "react-icons/gi";
import { useState } from "react";

const Sidebar = () => {
  const { value, setValue } = useAuth();
  const navigate = useNavigate(); 
  const [isExplorerExpand, setIsExplorerExpand] = useState(false);

  const sidebarItems = [
    { id: "New", name: "Home", icon: GoHome, type: "home" },
    { id: "Shorts", name: "Shorts", icon: SiYoutubeshorts, type: "search" },
    { id: "Subscriptions", name: "Subscriptions", icon: MdOutlineSubscriptions, type: "search" },
  ];

  const youItems = [
    { id: "Your Channel", name: "Your Channel", icon: FaRegUserCircle, type: "search" },
    { id: "Your Videos", name: "Your Videos", icon: BiVideo, type: "search" },
    { id: "Your Clips", name: "Your Clips", icon: GiLinkedRings, type: "search" },
    { id: "History", name: "History", icon: MdHistory, type: "search" },
  ];

  const exploreItems = [
    { id: "Trending", name: "Trending", icon: SiTrendmicro, type: "search" },
    { id: "Shopping", name: "Shopping", icon: HiOutlineShoppingBag, type: "search" },
    { id: "Movies", name: "Movies & Shows", icon: PiFilmSlateLight, type: "search" },
    { id: "Live", name: "Live", icon: CgMediaLive, type: "search" },
    { id: "Gaming", name: "Gaming", icon: SiYoutubegaming, type: "search" },
    { id: "News", name: "News", icon: FaRegNewspaper, type: "search" },
    { id: "Sports", name: "Sports", icon: TfiCup, type: "search" },
    { id: "Learning", name: "Learning", icon: PiLightbulbLight, type: "search" },
    { id: "Fashion", name: "Fashion & Beauty", icon: SiStylelint, type: "search" },
    { id: "Podcasts", name: "Podcasts", icon: MdPodcasts, type: "search" },
  ];

  const kidsItems = [
    { id: "YouTube Kids", name: "YouTube Kids", icon: SiYoutubekids, type: "search" },
    { id: "Premium", name: "YouTube Premium", icon: GiDiamondTrophy, type: "search" },
    { id: "Music", name: "YouTube Music", icon: SiYoutubemusic, type: "search" },
    { id: "Studio", name: "YouTube Studio", icon: SiYoutubestudio, type: "search" },
  ];

  const visibleExploreItems = isExplorerExpand ? exploreItems : exploreItems.slice(0, 3);

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
      id="youtube-main-sidebar" 
      className="w-full h-full py-2 px-1 md:px-2 [&::-webkit-scrollbar]:hidden overflow-y-auto overflow-x-hidden select-none bg-white"
    >
      
      {/* Primary Section */}
      <div className="space-y-0.5">
        {sidebarItems.map((item) => {
          const isActive = item.id === value;
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-100 font-medium text-zinc-950"
                  : "hover:bg-gray-50 font-normal text-zinc-700"
              }`}
            >
              <item.icon className="text-lg md:text-xl flex-shrink-0" />
              <span className="text-xs md:text-sm truncate">{item.name}</span>
            </div>
          );
        })}
      </div>

      <hr className="my-3 border-gray-100" />

      {/* "You" Section */}
      <div>
        <div className="flex items-center mb-1 px-4 gap-2 hover:bg-gray-50 rounded-xl py-2 duration-205 cursor-pointer">
          <p className="font-medium text-sm md:text-base text-zinc-900">You</p>
          <FaChevronRight className="text-[10px] text-gray-400" />
        </div>
        <div className="space-y-0.5">
          {youItems.map((item) => {
            const isActive = item.id === value;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                  isActive
                    ? "bg-gray-100 font-medium text-zinc-950"
                    : "hover:bg-gray-50 font-normal text-zinc-700"
                }`}
              >
                <item.icon className="text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm truncate">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="my-3 border-gray-100" />

      {/* Explore Section */}
      <div>
        <p className="font-medium text-sm md:text-base px-4 mb-1 py-1 text-zinc-900">Explore</p>
        <div className="space-y-0.5">
          {visibleExploreItems.map((item) => {
            const isActive = item.id === value;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                  isActive
                    ? "bg-gray-100 font-medium text-zinc-950"
                    : "hover:bg-gray-50 font-normal text-zinc-700"
                }`}
              >
                <item.icon className="text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm truncate">{item.name}</span>
              </div>
            );
          })}

          <div
            onClick={() => setIsExplorerExpand(!isExplorerExpand)}
            className="flex items-center gap-5 px-4 py-2 hover:bg-gray-50 rounded-xl ease-in-out duration-200 cursor-pointer text-zinc-700"
          >
            {isExplorerExpand ? (
              <>
                <VscChevronUp className="text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm font-normal">Show less</span>
              </>
            ) : (
              <>
                <VscChevronDown className="text-lg md:text-xl flex-shrink-0" />
                <span className="text-xs md:text-sm font-normal">Show more</span>
              </>
            )}
          </div>
        </div>
      </div>

      <hr className="my-3 border-gray-100" />

      {/* More From YouTube Section */}
      <div>
        <p className="font-medium text-sm md:text-base px-4 mb-1 py-1 text-zinc-900">More from YouTube</p>
        <div className="space-y-0.5">
          {kidsItems.map((item) => {
            const isActive = item.id === value;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                  isActive
                    ? "bg-gray-100 font-medium text-zinc-950"
                    : "hover:bg-gray-50 font-normal text-zinc-700"
                }`}
              >
                <item.icon className="text-lg md:text-xl flex-shrink-0 text-[#FF0000]" />
                <span className="text-xs md:text-sm truncate">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;