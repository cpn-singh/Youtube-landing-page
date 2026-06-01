import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      
      <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
      
      <span className="mt-4 text-sm font-medium text-zinc-600 tracking-wide">
        Loading...
      </span>
    </div>
  );
};

export default Loader;