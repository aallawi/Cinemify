import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, css }) => {
  return <LazyLoadImage src={src} className={css || ""} effect="blur" alt="" />;
};

export default Img;
