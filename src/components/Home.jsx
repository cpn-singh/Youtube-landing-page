import React from "react";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import Video from "./Video";
import { useAuth } from "../context/AuthProvider";
import ListItems from "./ListItems";
import Loader from "../loader/Loader";

const Home = () => {
  const { data, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
console.log("data idhar h",data)
  return (
    <div className="pt-12 mt-2 flex items-start justify-start gap-4 bg-white">
      
      {/* Sidebar Layout Container */}
      <div
        id="sidebar-layout-container"
        className="relative w-[12.4%] h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out flex-shrink-0"
      >
        <div id="youtube-main-sidebar" className="w-full h-full relative block">
          <Sidebar />
        </div>
        <div id="youtube-mini-sidebar" className="w-full h-full relative hidden">
          <Sidebar2 />
        </div>
      </div>

      {/* Main Video Feed Grid */}
      <div className="h-[calc(100vh-3.625rem)] flex-1 relative pt-2 pr-2 [&::-webkit-scrollbar]:hidden overflow-y-auto overflow-x-hidden select-none bg-white">
        <ListItems />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
          {data && data.length > 0 ? (
            data.map((item) => {
              // 🔑 FIX: Google Search returns the kind inside item.id.kind (e.g., "youtube#video")
              // If it's a channel or playlist item returned by search, we safely skip it.
              const itemKind = item?.id?.kind || item?.kind;
              if (itemKind !== "youtube#video") return null;

              // Use a unique combination for the key just in case (Google search sets ID inside item.id.videoId)
              const videoId = item?.id?.videoId || item?.id;

              return (
                <Video 
                  key={videoId} 
                  video={item} 
                />
              );
            })
          ) : (
            // Debug text in case your API returns an completely empty array
            <div className="col-span-full text-center py-10 text-gray-500 text-sm">
              No videos found. Check your API console for quota limits or errors.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;