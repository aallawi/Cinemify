import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import CarouselTitle from "../../../components/carousel/CarouselTitle";
import CarouselContent from "../../../components/carousel/CarouselContent";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { loading, data } = useFetch(`/${endpoint}/popular`);

  const onOptionChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="px-[20px] w-full max-w-[1200px] mx-auto">
      <CarouselTitle
        title="What's Popular"
        options={["Movies", "TV Shows"]}
        onOptionChange={onOptionChange}
      />
      <CarouselContent
        loading={loading}
        data={data?.results}
        endpoint={endpoint}
      />
    </div>
  );
};

export default Popular;
