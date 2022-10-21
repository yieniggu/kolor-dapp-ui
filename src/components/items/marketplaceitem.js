import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const costa = require("../../assets/image/costa.jpg");
const parque = require("../../assets/image/parque.jpg");

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const MarketplaceItem = ({ land }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const { name, size, city, country, stateOrRegion, species, tokenId, unit } =
    land;

  return (
    <>
      <div
        className="flex flex-col px-6 py-6 gap-4 bg-body rounded-3xl"
        data-aos="zoom-in"
        data-aos-duration={600}
      >
        <div className="w-full">
          <Slider {...settings}>
            <img src={costa} alt={name + "-costa"} />
            <img src={parque} alt={name + "-parque"} />
          </Slider>
        </div>
        <div className="text-white text-sm">{name}</div>
        <div className="flex gap-3">
          <div className="text-white">Land Size ({unit}):</div>
          <div className="text-app-main-100">{size}</div>
        </div>
        <div className="flex gap-3">
          <div className="text-white">Country:</div>
          <div className="text-app-main-100">{country}</div>
        </div>
        <div className="flex gap-3">
          <div className="text-white">State or region:</div>
          <div className="text-app-main-100">{stateOrRegion}</div>
        </div>
        <div className="flex gap-3">
          <div className="text-white">City:</div>
          <div className="text-app-main-100">{city}</div>
        </div>
        <div className="flex gap-3">
          <div className="text-white">Species in this land:</div>
          <div className="text-app-main-100">{species.length}</div>
        </div>
        <button
          className="border border-main px-6 py-1 rounded-full text-white hoverable-btn"
          onClick={() => navigate(`/lands/${tokenId}`)}
        >
          Explore land
        </button>
      </div>
    </>
  );
};

export default MarketplaceItem;
