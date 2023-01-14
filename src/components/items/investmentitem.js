import { useNavigate } from "react-router-dom";
import { getDate } from "../../utils/web3";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const minimap = require("../../assets/image/mini-map.png");

const InvestmentItem = ({ investment, index }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <div
        className="flex flex-col sm:flex-row"
        data-aos="zoom-in"
        data-aos-duration={index * 600}
      >
        <div className="hidden sm:flex items-center pt-24 justify-center absolute">
          <img src={minimap} alt={"mapa"} className="w-24" />
        </div>
        <div className="flex flex-col bg-body rounded-3xl ml-0 sm:ml-12 pt-4">
          <div className="flex sm:hidden items-center justify-center">
            <img src={minimap} alt={"mapa"} className="w-24" />
          </div>
          <div className="flex flex-col border-b border-app-dark-400 pl-4 sm:pl-20 pr-8 gap-4 pb-4">
            <div className="text-sm text-white text-investment">
              Investment {index + 1}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex w-full md:w-1/2 text-white">
                Tokens bought:
              </div>
              <div className="flex md:flex-row-reverse w-full md:w-1/2 text-app-dark-400">
                {investment[2]}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex w-full md:w-1/2 text-white">
                Token price:
              </div>
              <div className="flex md:flex-row-reverse w-full md:w-1/2 text-app-dark-400">
                {investment[3]} $cUSD
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex w-1/2 text-white">Total paid:</div>
              <div className="flex md:flex-row-reverse w-full md:w-1/2 text-app-dark-400">
                {investment[2] * investment[3]} $cUSD
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex w-1/2 text-white">Date of purchase:</div>
              <div className="flex md:flex-row-reverse w-full md:w-1/2 text-app-dark-400">
                {getDate(investment[5])}
              </div>
            </div>
          </div>
          <div
            className="flex cursor-pointer text-app-dark-400 items-center justify-center py-3 hoverable-btn"
            onClick={() => navigate(`/lands/${investment[0]}/buy`)}
          >
            Explore Land
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentItem;
