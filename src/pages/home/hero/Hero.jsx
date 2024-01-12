import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/img/Img";

const Hero = () => {
  const navigate = useNavigate();

  const [term, setTerm] = useState("");
  const [background, setBackground] = useState("");

  const { url } = useSelector((state) => state.home);
  const { loading, data } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchHandler = (event) => {
    if ((event.type == "click" || event.key == "Enter") && term.length > 0) {
      // navigate();
    }
  };

  return (
    <div className="hero relative w-full h-[450px] flex justify-center items-center bg-primary md:h-screen">
      {!loading && (
        <div className="good absolute top-0 left-0 w-full h-full opacity-70 overflow-hidden">
          <Img src={background} />
        </div>
      )}

      <div className="relative max-w-[800px] flex flex-col text-white text-center px-[20px] mx-auto">
        <h1 className="text-[50px] font-bold mb-[15px] md:mb-[5px] md:text-[90px]">
          Welcome.
        </h1>
        <h6 className="text-[18px] font-medium md:text-[24px]">
          Millions of movies, TV shows and people to discover. Explore now.
        </h6>
        <div className="w-full flex justify-center items-center mt-[40px]">
          <input
            className="hero_input h-[50px] text-[14px] text-black outline-none border-none rounded-l-[40px] pl-[20px] md:h-[60px] md:text-[20px]"
            type="text"
            onChange={(e) => setTerm(e.target.value.trim())}
            onKeyUp={searchHandler}
            placeholder="Search for a movie or tv show...."
          />
          <button
            className="w-[120px] h-[50px] text-[17px] font-[500] rounded-r-[40px] bg-secondary text-black md:h-[60px] md:text-[20px]"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </div>

      <div className="background_gradient_bt absolute bottom-0 left-0 w-full h-[150px]" />
    </div>
  );
};

export default Hero;
