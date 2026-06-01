import React from "react";
import Sidebar from "./Sidebar";
import Video from "./Video";
import { useAuth } from "../context/AuthProvider";
import ListItems from "./ListItems";
import Loader from "../loader/Loader";

const Home = ({ sidebarOpen }) => {
  const { data, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  console.log("data idhar h", data);

  return (
    <div className="pt-14 flex bg-white w-full min-h-screen">
      {!sidebarOpen && (
        <div
          className={`
    hidden lg:block
    flex-shrink-0
    transition-all duration-300
    overflow-hidden
    ${sidebarOpen ? "w-0" : "w-64"}
  `}
        >
          <Sidebar />
        </div>
      )}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-3 select-none bg-white">
        <ListItems />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-8 mt-5 justify-items-center sm:justify-items-stretch">
          {data && data.length > 0 ? (
            data.map((item) => {
              const itemKind = item?.id?.kind || item?.kind;
              if (itemKind !== "youtube#video") return null;

              const videoId = item?.id?.videoId || item?.id;

              return <Video key={videoId} video={item} />;
            })
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 text-sm tracking-wide">
              No videos found. Check your API console for quota limits or
              network errors.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
