import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import TopCast from "./topCast/TopCast";
import useFetch from "../../hooks/useFetch";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data: videos, loading: videosLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div className="bg-primary">
      <DetailsBanner intro={videos?.results?.[0]} crew={credits?.crew} />
      <TopCast cast={credits?.cast} loading={creditsLoading} />
    </div>
  );
};

export default Details;
