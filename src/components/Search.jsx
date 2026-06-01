import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapidapi"; 
import Sidebar from "./Sidebar";
import Video from "./Video"; 

const Search = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchQuery } = useParams(); 
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const endpoint = `search?part=snippet&maxResults=25&q=${encodeURIComponent(searchQuery)}&type=video`;
      const res = await fetchData(endpoint);
      
      setResult(res?.items || []);
    } catch (error) {
      console.error("Error fetching search result datasets:", error);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14 min-h-screen bg-white flex">
      
      {/* 1. LEFT SIDEBAR COLUMN DESKTOP WRAPPER */}
      <div className="w-[16%] h-[calc(100vh-3.5rem)] sticky top-14 hidden md:block flex-shrink-0 border-r border-gray-50 bg-white">
        <Sidebar />
      </div>

      {/* 2. RIGHT RESULTS TIMELINE CONTAINER */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto px-6 py-4 bg-white">
        <p className="text-zinc-500 text-xs mb-4">
          About {result.length} results for <span className="font-semibold text-zinc-900">"{searchQuery}"</span>
        </p>

        {loading ? (
          // Loading Fallback State
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          /* Vertical Grid Results List layout matching professional structural interfaces */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {result.length > 0 ? (
              result.map((item, index) => {
                const videoId = item?.id?.videoId || item?.id;
                if (!videoId) return null;

                return (
                  <Video 
                    key={videoId + "-" + index} 
                    video={item} 
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-zinc-500 text-sm">
                No matching video configurations found. Try adjusting your search query terminology.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Search;