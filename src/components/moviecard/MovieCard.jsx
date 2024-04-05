import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Rating from "../rating/Rating";
import Genres from "../genres/Genres";
import Img from "../img/Img";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="width_movie_card mb-[25px] cursor-pointer shrink-0 hover:opacity-70 transition-all ease duration-500"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="relative w-full flex items-end justify-between box_style mb-[30px] bg-cover bg-center">
        <Img
          css="w-full block rounded-[12px] md:max-w-[350px]"
          src={posterUrl}
        />
        {!fromSearch && (
          <>
            <Rating
              rating={data.vote_average.toFixed(1)}
              css={
                "relative top-[30px] bg-white shrink-0 w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
              }
            />
            <Genres
              data={data.genre_ids.slice(0, 2)}
              css={"hidden relative md:flex md:flex-wrap md:justify-end"}
            />
          </>
        )}
      </div>
      <div className="flex flex-col text-white box-hover:opacity-50 = ">
        <span className="title one_line text-[18px] mb-[10px] leading-6 md:text-[20px]">
          {data.title || data.name}
        </span>
        <span className="text-[16px] opacity-50">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
