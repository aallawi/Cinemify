import { useState } from "react";

const CarouselTitle = ({ title, options, onOptionChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const tabHandle = (tab, index) => {
    setSelectedTab(index);
    onOptionChange(tab);
    setLeft(index * 100);
  };

  return (
    <div className="flex justify-between items-center mb-[20px] px-[5px] md:px-[10px]">
      <h4 className="font-[600] text-[25px]">{title}</h4>
      <div className="h-[36px] p-[3px] bg-white rounded-[20px] select-none">
        <div className="h-[30px] relative flex items-center text-[18px] font-[500]">
          {options.map((tab, index) => (
            <span
              key={index}
              className={`w-[80px] text-center cursor-pointer animate_tap sm:w-[100px] ${
                selectedTab === index ? "z-10" : ""
              }`}
              onClick={() => tabHandle(tab, index)}
            >
              {tab}
            </span>
          ))}
          <span
            className="transition-all duration-500 absolute h-[30px] w-[80px] sm:w-[100px] bg-secondary rounded-[20px]"
            style={{ left }}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselTitle;
