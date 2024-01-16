import ReactPlayer from "react-player";
import { IoMdCloseCircle } from "react-icons/io";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const ClosePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[99] flex justify-center items-center select-none ${
        show ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-lightBalck backdrop-blur-[20px] transition duration-300 ${
          show ? " opacity-100" : " opacity-0"
        }`}
        onClick={ClosePopup}
      />
      <div className="relative w-full max-w-[800px] aspect-video text-right">
        <IoMdCloseCircle
          className="absolute right-0 top-[-40px] text-[40px] text-white cursor-pointer hover:text-red-700"
          onClick={ClosePopup}
        />

        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoPopup;
