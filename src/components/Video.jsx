import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";

const Video = ({ video }) => {
  return (
    <div>
      <Link to={`/video/${video.videoId}`}>
        <div className="flex flex-col">
          <div className="relative h-48 md:h-56 md:rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img
              className="h-full w-full pt-2"
              src={video?.thumbnails[0]?.url}
              alt=""
            />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>
          <div className="mt-2 flex items-start gap-3">
            <div className="w-8 h-8 overflow-hidden rounded-full flex-shrink-0">
              <img src={video?.author?.avatar[0]?.url} alt="" />
            </div>
            <div>
              <h2 className="text-base font-medium line-clamp-2">
                {video?.title}
              </h2>
              <p className="text-sm text-gray-500">{video?.author?.title}</p>
              <div className="flex gap-2">
                <p className="text-sm text-gray-500">
                  {video?.stats?.views} views
                </p>
                <p className="text-sm text-gray-500">
                  {video?.publishedTimeText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Video;
