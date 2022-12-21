import Layout from "../../../layout/web3";
import SideBar from "../../../components/sidebar/web3";
import React, { useEffect, useState } from "react";

import "aos/dist/aos.css";
import { Portfolio } from "./investments/portfolio";
import { Dao } from "./dao/dao";
import { useAccount, useNetwork } from "wagmi";
import { useNavigate } from "react-router-dom";
import { isValidNetwork } from "../../../utils/web3";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [selected, setSelected] = useState("investments");

  const navigate = useNavigate();

  const selectTab = ({ target }) => {
    setSelected(target.getAttribute("name"));
  };

  useEffect(() => {
    console.log("address: ", address, isConnected, chain);
    (!address || !isConnected || !isValidNetwork(chain.id)) &&
      navigate("/signin");
  }, [address, chain]);

  return (
    <>
      <Layout title="Kolor | Dashboard">
        <div className="flex gap-16 bg-dashboard min-h-screen w-full">
          <SideBar />
          <div className="flex flex-col pt-48 w-full gap-8 mb-10">
            <div className="flex flex-row gap-6 text-white ml-10 font-sans text-sm">
              <h2
                name="investments"
                className={`cursor-pointer ${
                  selected === "investments" && "border-b border-white"
                }`}
                onClick={selectTab}
              >
                Investments
              </h2>
              <h2
                name="dao"
                className={`cursor-pointer ${
                  selected === "dao" && "border-b border-white"
                }`}
                onClick={selectTab}
              >
                DAO
              </h2>
            </div>
            {selected === "investments" && <Portfolio />}
            {selected === "dao" && <Dao />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
