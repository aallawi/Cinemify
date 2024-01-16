const Genres = ({ data, css }) => {
  return (
    <div className=" flex gap-[20px] mb-[20px]">
      {data.map((item, index) => (
        <p
          key={index}
          className={`${css} rounded-[8px] bg-secondary font-[500] text-[18px] px-[10px]`}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default Genres;
