import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import ReactPlayer from "react-player";

const PlayingVideo = () => {
  const [video, setVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchVideoDetails();
    }
  }, [id]);

  const fetchVideoDetails = () => {
    fetchData(`video/details/?id=${id}`)
      .then((res) => {
        setVideo(res);
      })
      .catch((err) => {
        console.error("Error fetching video details:", err);
      });
  };

  return (
    <div className="pt-14 min-h-[calc(100vh-3.5rem)] bg-white flex justify-center">
      <div className="w-full max-w-[1750px] flex flex-col lg:flex-row gap-6 px-4 py-6 lg:px-8">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 lg:max-w-[calc(100%-420px)] xl:max-w-[calc(100%-450px)]">
          {id && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                playing={false}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                    },
                  },
                }}
              />
            </div>
          )}

          {/* VIDEO INFO */}
          <div className="mt-4 px-1">
            <h1 className="text-xl md:text-2xl font-bold text-black line-clamp-2">
              {video?.title || "Loading video title..."}
            </h1>

            {/* CHANNEL + ACTIONS */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mt-4 pb-4">
              
              {/* CHANNEL */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0">
                  {video?.author?.avatar?.[0]?.url && (
                    <img
                      src={video.author.avatar[0].url}
                      alt={video?.author?.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-black">
                    {video?.author?.title || "Channel Name"}
                  </h3>

                  <p className="text-xs text-zinc-500">
                    {video?.author?.stats?.subscribersText ||
                      "Subscribers"}
                  </p>
                </div>

                <button className="ml-2 bg-black hover:bg-zinc-800 text-white font-medium text-sm px-4 py-2 rounded-full transition-colors">
                  Subscribe
                </button>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-zinc-100 rounded-full overflow-hidden">
                  <button className="px-4 py-2 hover:bg-zinc-200 transition-colors border-r border-zinc-200">
                    👍{" "}
                    {video?.stats?.likes
                      ? `${(video.stats.likes / 1000).toFixed(1)}K`
                      : "Like"}
                  </button>

                  <button className="px-3 py-2 hover:bg-zinc-200 transition-colors">
                    👎
                  </button>
                </div>

                <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition-colors">
                  ↪️ Share
                </button>

                <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full transition-colors">
                  💾 Save
                </button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-zinc-100 rounded-xl p-4 text-sm text-zinc-800">
              <div className="font-semibold flex flex-wrap gap-3 mb-2">
                <span>
                  {video?.stats?.views
                    ? video.stats.views.toLocaleString()
                    : "0"}{" "}
                  views
                </span>

                <span>
                  {video?.publishedDate ||
                    video?.publishedTimeText ||
                    ""}
                </span>
              </div>

              <p className="whitespace-pre-wrap leading-relaxed">
                {video?.description || "No description available."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-[400px] xl:w-[420px] flex-shrink-0">
          <h2 className="text-sm font-semibold mb-4 text-black px-1">
            Up Next
          </h2>

          <div className="flex flex-col gap-3">
            <div className="text-xs text-zinc-500 p-4 border border-dashed border-zinc-300 rounded-xl text-center">
              Related videos list column space
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingVideo;