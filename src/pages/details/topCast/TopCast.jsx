import Img from "../../../components/img/Img";
import avatar from "../../../assets/avatar.png";
import { useSelector } from "react-redux";

const TopCast = ({ cast, loading }) => {
  const { url } = useSelector((state) => state.home);

  return (
    <div className=" relative pb-[50px] w-full max-w-[1200px] mx-auto px-[20px] text-white">
      {!loading && cast?.length > 0 && (
        <>
          <h1 className=" font-[600] text-[26px] mb-[15px]">Top Cast</h1>
          <div className=" flex gap-[20px] mx-[-20px] px-[20px] overflow-x-auto">
            {cast?.map((item) => (
              <div key={item.id} className="text-center ">
                <div className=" relative w-[125px] h-[125px] mp-[15px] md:w-[175px] md:h-[175px] md:mb-[25px]">
                  <Img
                    src={
                      item.profile_path
                        ? url.profile + item.profile_path
                        : avatar
                    }
                  />
                </div>
                <div className=" font-[500] text-[14px] leading-[20px] md:text-[20px] md:leading-[24px] pb-[5px]">
                  {item.name}
                </div>
                <div className=" opacity-50 text-[14px] leading-[20px] md:text-[18px] md:leading-[24px]">
                  {item.character}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TopCast;
