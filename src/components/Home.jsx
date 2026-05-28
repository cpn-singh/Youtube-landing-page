import React from "react";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import Video from "./Video";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { data } = useAuth();
  console.log(data);
  return (
    <div className="pt-12 mt-2 flex items-start justify-start gap-4">
      <div
        id="sidebar-layout-container"
        className="relative w-[14%] h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out flex-shrink-0"
      >
        <Sidebar />
        <Sidebar2 />
      </div>
      <div className="h-[calc(100vh-6.625rem)] py-2 overflow-y-auto overflow-x-hidden select-none bg-white">
        <div className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-5 ">
          {data.length > 0 &&
            data.map((item) => {
              if (item.type !== "video") return false;
              return <Video key={item.id} video={item?.video} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
