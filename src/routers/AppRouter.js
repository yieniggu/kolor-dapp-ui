import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import IntroPage from "../pages/intro";
import { store } from "../store/store";
import Web2Router from "./web2Router";
import Web3Router from "./web3Router";

export const AppRouter = () => {
  const { loginType } = useSelector((state) => state.NFT);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          {!loginType && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>

        {loginType && loginType === "web2" && <Web2Router />}
        {loginType && loginType === "web3" && <Web3Router />}
      </BrowserRouter>
    </>
  );
};
