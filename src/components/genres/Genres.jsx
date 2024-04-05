import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data, css }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div
      className={`hidden md:flex gap-[5px] pr-[10px] pb-[10px] flex-wrap justify-end ${css}`}
    >
      {data.map((genre, index) => {
        if (!genres[genre]?.name) return;
        return (
          <div
            key={index}
            className="bg-secondary rounded-[4px] text-[12px] text-black font-medium px-[5px] whitespace-nowrap"
          >
            {genres[genre]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
