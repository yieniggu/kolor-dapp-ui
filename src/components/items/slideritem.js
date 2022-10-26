const SliderItem = ({ image, name, title }) => {
  return (
    <div className="flex gap-4 justify-center items-center px-1">
      <img src={image} alt={name} className="rounded-full" />
      <div className="flex flex-col text-white">
        <span className="">{name}</span>
        {/* <span>{title}</span> */}
      </div>
    </div>
  );
};

export default SliderItem;
