import Hero from "./hero/Hero";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";

const Home = () => {
  return (
    <>
      <Hero />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
