import Hero from "./hero/Hero";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";

const Home = () => {
  return (
    <div className="bg-primary">
      <Hero />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
