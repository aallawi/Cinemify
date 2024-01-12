const Genres = ({ data }) => {
  return (
    <div className=" relative text-red-800">
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default Genres;
