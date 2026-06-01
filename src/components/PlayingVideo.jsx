import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import ReactPlayer from "react-player";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatBold } from "react-icons/pi";
import { MdPlaylistAdd } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";

const PlayingVideo = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [comments, setComments] = useState([]); // 💬 Holds comment stream
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchVideoDetails();
      fetchComments(); // Fetch comments when the video loads
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    if (video) {
      fetchRelatedVideo();
    }
  }, [video]);

  const fetchVideoDetails = async () => {
    try {
      const res = await fetchData(`videos?part=snippet,statistics,contentDetails&id=${id}`);
      if (res?.items && res.items.length > 0) {
        setVideo(res.items[0]);
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  // 1. Updated Suggested Videos Logic
  const fetchRelatedVideo = async () => {
    try {
      const channelId = video?.snippet?.channelId;
      const query = channelId ? `channelId=${channelId}` : `q=Trending`;
      
      // Pulls highly-targeted content using creator matching channels
      const res = await fetchData(`search?part=snippet&maxResults=15&type=video&${query}`);
      setRelatedVideo(res?.items || []);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  // 2. Added Real User Comment Feed Logic
  const fetchComments = async () => {
    try {
      const res = await fetchData(`commentThreads?part=snippet&maxResults=20&videoId=${id}`);
      setComments(res?.items || []);
    } catch (error) {
      console.error("Error loading user comments:", error);
      setComments([]); // Fallback if comments are disabled on this video
    }
  };

  const snippet = video?.snippet;
  const statistics = video?.statistics;

  return (
    <div className="pt-14 min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[1800px] flex flex-col lg:flex-row gap-6 px-4 py-6">
        
        {/* LEFT SECTION (Video Player, Meta Data, and Comments) */}
        <div className="flex-1">
          {id && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-sm">
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                playing={true}
              />
            </div>
          )}

          <h1 className="text-xl md:text-2xl font-semibold mt-4 text-zinc-900 leading-snug">
            {snippet?.title}
          </h1>

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold select-none text-sm uppercase">
                {snippet?.channelTitle?.charAt(0) || "Y"}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 text-sm md:text-base">
                  {snippet?.channelTitle}
                </h3>
                <p className="text-xs text-zinc-500">Official Creator Partner</p>
              </div>
              <button className="bg-zinc-900 text-white text-sm px-4 py-2 ml-2 rounded-full font-medium hover:bg-zinc-800 cursor-pointer">
                Subscribe
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-zinc-800 text-xs md:text-sm">
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer">
                <AiOutlineLike className="text-lg" />
                {statistics?.likeCount ? `${(Number(statistics.likeCount) / 1000).toFixed(1)}K` : "Like"}
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer">
                <PiShareFatBold className="text-lg" /> Share
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer">
                <HiOutlineDownload className="text-lg" /> Download
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer">
                <MdPlaylistAdd className="text-lg" /> Save
              </button>
            </div>
          </div>

          <div className="mt-4 bg-zinc-50 border border-zinc-100 rounded-xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-4 text-xs md:text-sm font-semibold text-zinc-800">
              <span>{statistics?.viewCount ? Number(statistics.viewCount).toLocaleString() : 0} views</span>
              <span>{snippet?.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString() : ""}</span>
            </div>
            <p className="mt-3 text-xs md:text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
              {snippet?.description || "No description provided."}
            </p>
          </div>

          {/* 💬 INTERACTIVE COMMENT MODULE SECTION */}
          <div className="mt-6 border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">
              {statistics?.commentCount ? `${Number(statistics.commentCount).toLocaleString()} Comments` : "Comments"}
            </h2>
            
            <div className="flex flex-col gap-5 mt-2">
              {comments.length > 0 ? (
                comments.map((commentItem) => {
                  const comment = commentItem?.snippet?.topLevelComment?.snippet;
                  if (!comment) return null;

                  return (
                    <div key={commentItem.id} className="flex gap-3 items-start text-sm">
                      <img 
                        src={comment?.authorProfileImageUrl} 
                        alt={comment?.authorDisplayName} 
                        className="w-9 h-9 rounded-full object-cover bg-zinc-100 border border-zinc-200/60"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/36"; }} 
                      />
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900 text-xs">{comment?.authorDisplayName}</span>
                          <span className="text-[11px] text-zinc-400">{new Date(comment?.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-zinc-700 text-xs md:text-sm mt-0.5 whitespace-pre-wrap leading-normal" dangerouslySetInnerHTML={{ __html: comment?.textDisplay }} />
                        <div className="flex items-center gap-1 mt-1 text-zinc-500">
                          <AiOutlineLike className="text-xs cursor-pointer hover:text-black" />
                          <span className="text-[11px] font-medium">{comment?.likeCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-zinc-500 text-xs py-4">Comments are loading or disabled for this video.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Up Next Video Suggestions) */}
        <div className="w-full lg:w-[400px] xl:w-[420px] flex-shrink-0">
          <h2 className="font-semibold text-zinc-900 text-md mb-4 tracking-tight">Up Next</h2>
          <div className="flex flex-col gap-3">
            {relatedVideo.length > 0 ? (
              relatedVideo.map((item, index) => {
                const itemSnippet = item?.snippet;
                const relatedId = item?.id?.videoId || item?.id;

                if (!itemSnippet || !relatedId) return null;
                const thumbnail = itemSnippet?.thumbnails?.medium?.url || itemSnippet?.thumbnails?.default?.url;

                return (
                  <Link
                    key={relatedId + "-" + index}
                    to={`/video/${relatedId}`}
                    className="flex gap-2.5 hover:bg-zinc-50 p-1.5 rounded-xl transition-all duration-150"
                  >
                    <div className="w-40 h-24 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img src={thumbnail} alt={itemSnippet?.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-xs md:text-sm font-medium line-clamp-2 text-zinc-900 leading-tight">
                        {itemSnippet?.title}
                      </h3>
                      <p className="text-[11px] md:text-xs text-zinc-600 mt-1 truncate">{itemSnippet?.channelTitle}</p>
                      <p className="text-[10px] md:text-xs text-zinc-400 mt-0.5">
                        {itemSnippet?.publishedAt ? new Date(itemSnippet.publishedAt).toLocaleDateString() : "Recommended"}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center text-zinc-400 text-xs py-10 tracking-wide">Loading recommendations...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayingVideo;