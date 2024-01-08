import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import CarouselTitle from "../../../components/carousel/CarouselTitle";
import CarouselContent from "../../../components/carousel/CarouselContent";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { loading, data } = useFetch(`/trending/movie/${endpoint}`);

  const onOptionChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="background">
      <div className="px-[20px] w-full max-w-[1200px] mx-auto">
        <CarouselTitle
          title="Trending"
          options={["Day", "Week"]}
          onOptionChange={onOptionChange}
        />
        <CarouselContent
          loading={loading}
          data={data?.results}
          endpoint={endpoint}
        />
      </div>
    </div>
  );
};

export default Trending;
