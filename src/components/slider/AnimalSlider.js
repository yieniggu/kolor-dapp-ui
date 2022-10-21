import Slider from "react-slick";
import { animalList } from "./animallist";
import SliderItem from "../items/slideritem";

const AnimalSlider = ({ responsive }) => {
  var settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    swipeToSlide: true,
    responsive: responsive,
  };

  return (
    <div className="px-6">
      <Slider {...settings}>
        {animalList.map((tree, index) => (
          <SliderItem
            image={tree.image}
            name={tree.name}
            title={tree.title}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
};

export default AnimalSlider;
