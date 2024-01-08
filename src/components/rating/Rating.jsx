import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Rating = ({ rating }) => {
  return (
    <div className="relative bottom-[-20px] left-[10px] w-[40px] h-[40px] p-[2px] bg-white rounded-full >> md:w-[50px] md:h-[50px] md:bottom-[-25px]">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default Rating;
