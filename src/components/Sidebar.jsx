import { useState } from "react";
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
import { LuFlag } from "react-icons/lu";

const Sidebar = () => {
  const [activeId, setActiveId] = useState(1);
  const [isExplorerExpand, setIsExplorerExpand] = useState(false);

  const sidebarItems = [
    { id: 1, name: "Home", icon: GoHome },
    { id: 2, name: "Shorts", icon: SiYoutubeshorts },
    { id: 3, name: "Subscriptions", icon: MdOutlineSubscriptions },
  ];

  const youItems = [
    { id: 4, name: "Your Channel", icon: FaRegUserCircle },
    { id: 5, name: "Your Videos", icon: BiVideo },
    { id: 6, name: "Your Clips", icon: GiLinkedRings },
    { id: 7, name: "History", icon: MdHistory },
  ];

  const exploreItems = [
    { id: 8, name: "Trending", icon: SiTrendmicro },
    { id: 9, name: "Shopping", icon: HiOutlineShoppingBag },
    { id: 10, name: "Movies & Shows", icon: PiFilmSlateLight },
    { id: 11, name: "Live", icon: CgMediaLive },
    { id: 12, name: "Gaming", icon: SiYoutubegaming },
    { id: 13, name: "News", icon: FaRegNewspaper },
    { id: 14, name: "Sports", icon: TfiCup },
    { id: 15, name: "Learning", icon: PiLightbulbLight },
    { id: 16, name: "Fashion & Beauty", icon: SiStylelint },
    { id: 17, name: "Podcasts", icon: MdPodcasts },
  ];

  const kidsItems = [
    { id: 18, name: "YouTube Kids", icon: SiYoutubekids },
    { id: 19, name: "YouTube Premium", icon: GiDiamondTrophy },
    { id: 20, name: "YouTube Music", icon: SiYoutubemusic },
    { id: 21, name: "YouTube Studio", icon: SiYoutubestudio },
  ];

  const visibleExploreItems = isExplorerExpand
    ? exploreItems
    : exploreItems.slice(0, 3);

  return (
    <div id="youtube-main-sidebar" className="absolute top-0 left-0 w-full h-full py-2 overflow-y-auto overflow-x-hidden select-none bg-white">
      {/* Primary Section */}
      <div className="px-2 space-y-0.5">
        {sidebarItems.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-200/80 dark:bg-neutral-300 font-medium text-black"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-200/50 font-normal text-zinc-800"
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-sm">{item.name}</span>
            </div>
          );
        })}
      </div>

      <hr className="my-3 border-gray-200 dark:border-neutral-300" />

      {/* "You" Section */}
      <div className="px-2">
        <div className="flex items-center mb-1 px-4 gap-2 hover:bg-gray-100 dark:hover:bg-neutral-300 rounded-xl py-2 duration-200 cursor-pointer">
          <p className="font-medium text-base">You</p>
          <FaChevronRight className="text-xs text-gray-500" />
        </div>
        {youItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-200/80 dark:bg-neutral-300 font-medium text-black"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-200/50 font-normal text-zinc-800"
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-sm">{item.name}</span>
            </div>
          );
        })}
      </div>

      <hr className="my-3 border-gray-200 dark:border-neutral-300" />

      {/* Explore Section */}
      <div className="px-2">
        <p className="font-medium text-base px-4 mb-1 py-1">Explore</p>
        {visibleExploreItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-200/80 dark:bg-neutral-300 font-medium text-black"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-200/50 font-normal text-zinc-800"
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-sm">{item.name}</span>
            </div>
          );
        })}

        {/* Toggle Expand Row */}
        <div
          onClick={() => setIsExplorerExpand(!isExplorerExpand)}
          className="flex items-center gap-5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-300 rounded-xl ease-in-out duration-200 cursor-pointer"
        >
          {isExplorerExpand ? (
            <>
              <VscChevronUp className="text-xl" />
              <span className="text-sm font-normal">Show less</span>
            </>
          ) : (
            <>
              <VscChevronDown className="text-xl" />
              <span className="text-sm font-normal">Show more</span>
            </>
          )}
        </div>
      </div>

      <hr className="my-3 border-gray-200 dark:border-neutral-300" />

      {/* More From YouTube Section */}
      <div className="px-2">
        <p className="font-medium text-base px-4 mb-1 py-1">
          More from YouTube
        </p>
        {kidsItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-5 px-4 py-2 rounded-xl duration-150 cursor-pointer select-none ${
                isActive
                  ? "bg-gray-200/80 dark:bg-neutral-300 font-medium text-black"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-200/50 font-normal text-zinc-800"
              }`}
            >
              <item.icon className="text-xl text-[#FF0000]" />
              <span className="text-sm">{item.name}</span>
            </div>
          );
        })}
      </div>
      <hr className="my-3 border-gray-200 dark:border-neutral-300" />
      <div className="px-2">
        <div className="flex items-center gap-5 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-300 rounded-xl duration-200 cursor-pointer">
          <LuFlag className="text-xl" />
          <p>Report History</p>
        </div>
      </div>
      <hr className="my-3 border-gray-200 dark:border-neutral-300" />
      <div className="px-6 py-3 text-[13px] font-semibold dark:text-neutral-700 space-y-3 select-none">
        {/* First row of links */}
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          <a href="#">About</a>
          <a href="#">Press</a>
          <a href="#">Copyright</a>
          <a href="#">Contact us</a>
          <a href="#">Creators</a>
          <a href="#">Advertise</a>
          <a href="#">Developers</a>
        </div>

        {/* Second row of links */}
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Policy & Safety</a>
          <a href="#">How YouTube works</a>
          <a href="#">Test new features</a>
        </div>

        {/* Copyright Text */}
        <p className="pt-2 text-[12px] font-normal text-zinc-400 dark:text-neutral-500">
          © 2026 Google LLC
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
