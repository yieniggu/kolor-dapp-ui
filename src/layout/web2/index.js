import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Header from "./header";

const Layout = ({ title, children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col items-center min-h-screen justify-between relative overflow-x-hidden overflow-y-hidden bg-main">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="w-full flex flex-col gap-16">{children}</main>
    </div>
  );
};

export default Layout;
