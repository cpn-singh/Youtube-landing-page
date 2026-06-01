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
  const [comments, setComments] = useState([]); 
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchVideoDetails();
      fetchComments(); 
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

  const fetchRelatedVideo = async () => {
    try {
      const channelId = video?.snippet?.channelId;
      const query = channelId ? `channelId=${channelId}` : `q=Trending`;
      
      const res = await fetchData(`search?part=snippet&maxResults=15&type=video&${query}`);
      setRelatedVideo(res?.items || []);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetchData(`commentThreads?part=snippet&maxResults=20&videoId=${id}`);
      setComments(res?.items || []);
    } catch (error) {
      console.error("Error loading user comments:", error);
      setComments([]); 
    }
  };

  const snippet = video?.snippet;
  const statistics = video?.statistics;

  return (
    <div className="pt-14 min-h-screen bg-white flex justify-center w-full">
      <div className="w-full max-w-[1750px] flex flex-col lg:flex-row gap-6 px-3 md:px-6 py-4">
        
        {/* LEFT SECTION (Video Player, Meta Data, and Comments) */}
        <div className="flex-1 min-w-0">
          {id && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-sm relative">
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                playing={true}
              />
            </div>
          )}

          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mt-4 text-zinc-900 leading-snug break-words">
            {snippet?.title}
          </h1>

          {/* Controls Bar Wrapper Layout */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mt-4 border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3 justify-between sm:justify-start w-full xl:w-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-850 flex items-center justify-center text-white font-bold select-none text-sm uppercase flex-shrink-0">
                  {snippet?.channelTitle?.charAt(0) || "Y"}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-zinc-900 text-sm md:text-base truncate">
                    {snippet?.channelTitle}
                  </h3>
                  <p className="text-xs text-zinc-500 truncate">Official Creator Partner</p>
                </div>
              </div>
              <button className="bg-zinc-900 text-white text-xs md:text-sm px-4 py-2 ml-2 rounded-full font-medium hover:bg-zinc-800 cursor-pointer transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>

            {/* Scrollable control buttons panel for tight mobile frames */}
            <div className="flex items-center gap-2 text-zinc-805 text-xs md:text-sm overflow-x-auto pb-2 xl:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer whitespace-nowrap flex-shrink-0">
                <AiOutlineLike className="text-base md:text-lg" />
                {statistics?.likeCount ? `${(Number(statistics.likeCount) / 1000).toFixed(1)}K` : "Like"}
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer whitespace-nowrap flex-shrink-0">
                <PiShareFatBold className="text-base md:text-lg" /> Share
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer whitespace-nowrap flex-shrink-0">
                <HiOutlineDownload className="text-base md:text-lg" /> Download
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium cursor-pointer whitespace-nowrap flex-shrink-0">
                <MdPlaylistAdd className="text-base md:text-lg" /> Save
              </button>
            </div>
          </div>

          <div className="mt-4 bg-zinc-50 border border-zinc-100 rounded-xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-4 text-xs md:text-sm font-semibold text-zinc-800">
              <span>{statistics?.viewCount ? Number(statistics.viewCount).toLocaleString() : 0} views</span>
              <span>{snippet?.publishedAt ? new Date(snippet.publishedAt).toLocaleDateString() : ""}</span>
            </div>
            <p className="mt-3 text-xs md:text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed break-words">
              {snippet?.description || "No description provided."}
            </p>
          </div>

          {/* COMMENTS SECTION */}
          <div className="mt-6 pt-2">
            <h2 className="text-md md:text-lg font-bold text-zinc-900 mb-4">
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
                        className="w-9 h-9 rounded-full object-cover bg-zinc-100 border border-zinc-200/60 flex-shrink-0"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/36"; }} 
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="font-semibold text-zinc-900 text-xs truncate max-w-[150px] sm:max-w-xs">{comment?.authorDisplayName}</span>
                          <span className="text-[11px] text-zinc-400">{new Date(comment?.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-zinc-700 text-xs md:text-sm mt-0.5 whitespace-pre-wrap leading-normal break-words" dangerouslySetInnerHTML={{ __html: comment?.textDisplay }} />
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
        <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 lg:border-l lg:border-zinc-50 lg:pl-4">
          <h2 className="font-semibold text-zinc-900 text-sm md:text-md mb-4 tracking-tight">Up Next</h2>
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
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
                    className="flex gap-3 hover:bg-zinc-50 p-1.5 rounded-xl transition-all duration-150 items-start"
                  >
                    <div className="w-32 h-20 sm:w-40 sm:h-24 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
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
              <div className="text-center text-zinc-400 text-xs py-10 tracking-wide col-span-full">Loading recommendations...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayingVideo;