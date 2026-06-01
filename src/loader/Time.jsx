import React from "react";

const Time = ({ duration }) => {
  return (
    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
      {duration}
    </span>
  );
};

export default Time;