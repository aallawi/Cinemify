import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/img/Img";
import Genres from "../../../components/genres/Genres";
import PlayIcon from "../../../components/playIcon/PlayIcon";
import Rating from "../../../components/rating/Rating";
import dayjs from "dayjs";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ intro, crew }) => {
  const { mediaType, id } = useParams();

  // Fetch mediaType data
  const { loading, data } = useFetch(`/${mediaType}/${id}`);

  // Video intro data
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // URL
  const { url } = useSelector((state) => state.home);

  // Genres - Director - Writer
  const genres = data?.genres?.map((g) => g.name);
  const director = crew?.filter((d) => d.job === "Director");
  const writer = crew?.filter(
    (r) => r.job === "Screenplay" || r.job === "Story" || r.job === "Writer"
  );

  // Convert minutes to hours and minutes
  const ConvertMinutesToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className=" relative w-full bg-primary pt-[100px] mb-[50px] md:mb-0 md:min-h-[700px]">
      {!loading && data && (
        <>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
            {/* <img src={PosterFallback} /> */}
            <Img
              src={
                data.poster_path
                  ? url.backdrop + data.poster_path
                  : PosterFallback
              }
            />
          </div>

          {/* content */}
          <div className="w-full max-w-[1200px] mx-auto px-[20px]">
            <div className="relative z-10 flex flex-col gap-[25px] md:flex-row md:gap-[50px]">
              <div className="left shrink-0">
                <Img
                  src={
                    data.poster_path
                      ? url.backdrop + data.poster_path
                      : PosterFallback
                  }
                  css="w-full h-full block box_style rounded-[12px] md:max-w-[350px]"
                />
              </div>
              <div className="right">
                {/* Name */}
                <h1 className="text-[28px] font-[500] md:text-[38px]">
                  {`${data.name || data.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </h1>
                <div className="italic text-slate-600 font-[500] pb-[20px] text-[18px] md:text-[20px]">
                  {data.tagline}
                </div>

                <Genres data={genres.slice(0, 2)} />

                <div className="flex items-center gap-[25px] mb-[25px] select-none">
                  <Rating
                    rating={data.vote_average.toFixed(1)}
                    css="fill-[white] max-w-[70px] md:max-w-[90px]"
                  />
                  <div
                    className="transition duration-300 playbtn hover:text-secondary"
                    onClick={() => {
                      setVideoId(intro.key);
                      setShow(true);
                    }}
                  >
                    <PlayIcon />
                    <span className="font-[500] text-[25px]">
                      Watch Trailer
                    </span>
                  </div>
                </div>

                {/* Overview */}
                <div className="mb-[20px]">
                  <h4 className="font-[500] mb-[10px]">Overview</h4>
                  <p className="leading-[24px] lg:pr-[100px]">
                    {data.overview}
                  </p>
                </div>

                <div className="info">
                  {/* Status */}
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}
                  {/* Release Date */}
                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {/* Runtime */}
                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">
                        {ConvertMinutesToHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Director */}
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {director.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {/* Writer */}
                {writer?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer: </span>
                    <span className="text">
                      {writer?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {writer.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {/* Creator */}
                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator: </span>
                    <span className="text">
                      {data?.created_by?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {data?.created_by.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[250px] background_gradient_bt" />
        </>
      )}
    </div>
  );
};

export default DetailsBanner;
