import useFetch from "../../../hooks/useFetch";
import CarouselContent from "../../../components/carousel/CarouselContent";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <div className=" pb-[50px] w-full max-w-[1200px] mx-auto px-[20px] text-white">
      <CarouselContent
        loading={loading}
        data={data?.results}
        endpoint={mediaType}
        subtitle="Recommendations"
      />
    </div>
  );
};

export default Recommendation;
