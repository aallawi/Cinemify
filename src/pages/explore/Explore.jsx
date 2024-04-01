import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/moviecard/MovieCard";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const { mediaType } = useParams();

  const [sortby, setSortby] = useState(null);
  const [genre, setGenre] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  //console.log("genresOptions", genresData?.genres); // { id:1, name : "Option1"}  ==> { value:1, label: 'option1', name: 'Option1' }
  //console.log("sortbyOptions", sortbyData); // { value: "Option1", label: "Option1"}

  // fetch Initial Data
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res.results);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  // fetch Next Page Data
  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        setData([...data, ...res.results]);
        setPageNum((prev) => prev + 1);
      }
    );
  };

  // onChange
  const onChange = (selectedItems, action) => {
    console.log("selectedItemsSSS", selectedItems.value);
    console.log("actionSSS", action);
    console.log(filters);
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  return (
    <div className="pt-[100px] min-h-[700px] bg-primary">
      <div className="w-full max-w-[1200px] mx-auto px-[20px]">
        <div className="flex flex-col justify-between mb-[25px] md:flex-row">
          <div className="text-[26px] font-[500] leading-9 mb-[10px] md:mb-0">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="flex gap-[14px] flex-col md:flex-row">
            <Select
              isMulti
              name="genres"
              value={genre}
              options={genresData?.genres}
              onChange={onChange}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              isClearable={true}
              closeMenuOnSelect={false}
              placeholder="Select genres"
              className="w-full text-[15px] md:min-w-[250px] md:max-w-[500px]"
              classNamePrefix="react-select"
            />

            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="w-full text-[15px] shrink-0 md:w-[250px]"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.length > 0 ? (
              <InfiniteScroll
                className="flex flex-wrap gap-[10px] mb-[50px] md:mb-[20px]"
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= 10}
                loader={<Spinner />}
              >
                {data?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="text-[24px] bt-[80px] text-secondary">
                Sorry, Results not found!
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
