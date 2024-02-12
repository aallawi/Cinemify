import { useState } from "react";
import Img from "../../../components/img/Img";
import PlayIcon from "../../../components/playIcon/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const VideosSection = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  return (
    <div className=" relative pb-[50px] w-full max-w-[1200px] mx-auto px-[20px] text-white">
      {!loading && videos?.results?.length > 0 && (
        <>
          <h1 className=" font-[600] text-[26px] mb-[25px]">Official Videos</h1>
          <div className=" flex gap-[10px] mx-[-20px] px-[20px] overflow-x-auto md:gap-[20px] md:mx-0 md:px-0">
            {videos?.results?.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
                className="test w-[150px] shrink-0 md:w-[25%]"
              >
                <div className="playbtn centerIcon mb-[15px]">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="test-hover:bg-orange-600 text-[16px] leading-[22px] >> md:text-[18px] md:leading-[26px]">
                  {video.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
