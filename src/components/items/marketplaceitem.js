import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/UI/uiSlice";

const Placeholder = require("../../assets/image/placeholder.png");

const MarketplaceItem = ({ land }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const { name, size, city, country, stateOrRegion, species, tokenId, unit } =
    land;

  return (
    <>
      {/* {!name.includes("test") && !name.includes("Test") && ( */}
      <div
        className="flex flex-col px-6 py-6 gap-4 bg-body rounded-3xl 3xl:w-3/4 tiny:w-full "
        data-aos="zoom-in"
        data-aos-duration={600}
      >
        <div className="w-full">
          <img src={Placeholder} alt={name + "-placeholder"} />
        </div>
        <div className="text-white text-sm xl:h-16 3xl:h-10">{name}</div>
        <button
          className="rounded-full px-2 bg-interaction w-44 text-white font-sans font-sm"
          disabled
        >
          Kolor Alpha presale
        </button>
        <div className="flex flex-row justify-between gap-3">
          <div className="text-gray-400">Land Size ({unit}):</div>
          <div className="text-white">{size}</div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div className="text-gray-400">Country:</div>
          <div className="text-white">{country}</div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div className="text-gray-400">State or region:</div>
          <div className="text-white">{stateOrRegion}</div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div className="text-gray-400">City:</div>
          <div className="text-white">{city}</div>
        </div>
        {/* <div className="flex gap-3">
          <div className="text-white">Species in this land:</div>
          <div className="text-app-main-100">{species.length}</div>
        </div> */}
        <button
          className="border border-main px-6 py-1 rounded-full text-white hoverable-btn"
          onClick={() => navigate(`/lands/${tokenId}/buy`)}
        >
          Explore land
        </button>
        <p
          onClick={() => dispatch(openModal({ type: "toc" }))}
          className="text-center rounded-full text-white bg-gray-500 px-2 text-xs w-full md:w-3/5 lg:w-4/5 mx-auto cursor-pointer"
        >
          Terms and conditions
        </p>
      </div>
      {/* )} */}
    </>
  );
};

export default MarketplaceItem;
