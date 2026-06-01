import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Video = ({ video }) => {
  const [duration, setDuration] = useState("");

  const snippet = video?.snippet;

  const currentVideoId =
    video?.id?.videoId || video?.id;

  const thumbnail =
    snippet?.thumbnails?.high?.url ||
    snippet?.thumbnails?.medium?.url ||
    snippet?.thumbnails?.default?.url;

  const channelAvatar =
    snippet?.channelThumbnail?.[0]?.url ||
    snippet?.channelThumbnail?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      snippet?.channelTitle || "YouTube"
    )}&background=random&size=128`;

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${currentVideoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        const data = await response.json();

        const isoDuration =
          data?.items?.[0]?.contentDetails?.duration;

        if (!isoDuration) return;

        const match = isoDuration.match(
          /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
        );

        const hours = parseInt(match?.[1] || 0);
        const minutes = parseInt(match?.[2] || 0);
        const seconds = parseInt(match?.[3] || 0);

        const formatted =
          hours > 0
            ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
            : `${minutes}:${String(seconds).padStart(2, "0")}`;

        setDuration(formatted);
      } catch (error) {
        console.error("Duration fetch error:", error);
      }
    };

    if (currentVideoId) {
      fetchDuration();
    }
  }, [currentVideoId]);

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200 ease-out">
      <Link to={`/video/${currentVideoId}`}>
        <div className="flex flex-col">
          
          {/* Thumbnail */}
          <div className="relative h-48 md:h-52 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={thumbnail}
              alt={snippet?.title || "Thumbnail"}
              className="h-full w-full object-cover"
            />

            {/* Duration Badge */}
            {duration && (
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                {duration}
              </span>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-3 flex items-start gap-3 px-2 pb-2">
            
            {/* Channel Avatar */}
            <img
              src={channelAvatar}
              alt={snippet?.channelTitle}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-200"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  snippet?.channelTitle || "YouTube"
                )}&background=random&size=128`;
              }}
            />

            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-zinc-900 line-clamp-2 leading-tight">
                {snippet?.title}
              </h2>

              <p className="text-xs flex items-center gap-1 text-zinc-600 mt-1">
                {snippet?.channelTitle}
                <BsFillCheckCircleFill className="text-zinc-400 text-[11px]" />
              </p>

              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                <span>Recommended</span>
                <span>•</span>
                <span>
                  {snippet?.publishedAt
                    ? new Date(
                        snippet.publishedAt
                      ).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default Video;