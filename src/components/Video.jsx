import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Video = ({ video }) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-xl hover:bg-pink-200/50 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.55)] hover:shadow-pink-500/50">
      <Link to={`/video/${video.videoId}`}>
        <div className="flex flex-col">
          <div className="relative h-48 md:h-56 md:rounded-xl duration-200 overflow-hidden ">
            <img
              className="h-full w-full pt-2 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
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
              <p className="text-sm flex items-center gap-2 text-gray-500">
                {video?.author?.title}{" "}
                <span>
                  {" "}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-gray-500 text-sm" />
                  )}
                </span>
              </p>
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
