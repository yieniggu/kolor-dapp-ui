import Layout from "../../../layout/web2";
import SideBar from "../../../components/sidebar/web2";
import React, { useEffect, useState } from "react";

import "aos/dist/aos.css";
import { Portfolio } from "./investments/portfolio";
import { Dao } from "./dao/dao";

const Dashboard = () => {
  const [selected, setSelected] = useState("investments");

  const selectTab = ({ target }) => {
    setSelected(target.getAttribute("name"));
  };

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
