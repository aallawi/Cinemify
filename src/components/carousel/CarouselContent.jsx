import { useRef } from "react";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Rating from "../../components/rating/Rating";
import Img from "../../components/img/Img";
import Genres from "../../components/genres/Genres";
import NoPoster from "../../assets/no-poster.png";

const CarouselContent = ({ loading, data, endpoint, subtitle }) => {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const { url } = useSelector((state) => state.home);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === "left") {
      current.scrollLeft -= current.offsetWidth + 20;
    } else {
      current.scrollLeft += current.offsetWidth + 20;
    }
  };

  return (
    <div className="pb-[40px]">
      <div className="relative">
        {subtitle && (
          <div className="text-[20px] font-[600] mb-[10px] >> md:text-[25px]">
            {subtitle}
          </div>
        )}

        {data?.length > 4 && (
          <>
            <MdOutlineKeyboardDoubleArrowLeft
              className="arrow_style left-[-18px] hidden md:block hover:opacity-100"
              onClick={() => scroll("left")}
            />
            <MdOutlineKeyboardDoubleArrowRight
              className="arrow_style right-[-18px] hidden md:block hover:opacity-100"
              onClick={() => scroll("right")}
            />
          </>
        )}

        {!loading && (
          <div
            className="flex gap-[20px] mx-[-20px] px-[20px] overflow-y-hidden >> md:m-0 md:px-0 md:overflow-hidden"
            ref={scrollRef}
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : NoPoster;
              return (
                <div
                  key={item.id}
                  className="carousel_item_width shrink-0 cursor-pointer"
                  // onClick={() =>
                  //   navigate()
                  // }
                >
                  <div className="box_style relative w-full flex items-end justify-between">
                    <Img src={posterUrl} />
                    <Rating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="py-[20px] md:py-[30px]">
                    <span className="one_line block text-[18px] font-[500] >> md:text-[22px]">
                      {item.title || item.name}
                    </span>
                    <span className="text-[17px]">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselContent;
