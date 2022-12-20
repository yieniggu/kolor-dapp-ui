import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAssetsBalances } from "../../../store/slices/token/thunks";
import { closeModal } from "../../../store/slices/UI/uiSlice";
import "../modal.css";

export const Modal = () => {
  const { isOpen, type, title, subtitle, body } = useSelector(
    (state) => state.ui
  );

  console.log(body);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`modal text-app-gray-200`}
      onClick={() => dispatch(closeModal())}
    >
      <div
        className={`small-modal ${
          type === "success" ? "bg-gradient" : "bg-error"
        } absolute bottom-0 top-1/2 px-6 lg:px-12 py-6 transform -translate-y-1/2 left-1/2 -translate-x-1/2 pb-6 md:rounded-md overflow-hidden w-11/12 md:w-2/3 lg:w-2/4 xl:w-1/3 h-64 rounded-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto flex flex-col gap-4 justify-center items-center pt-4 w-full">
          <span className="flex text-white text-sm justify-center">
            {" "}
            <strong>{title}</strong>
          </span>
          <span className="flex text-white">{subtitle}</span>
          <span className="text-white">
            {Array.isArray(body)
              ? body.map((message) => {
                  return (
                    <a
                      target="_blank"
                      href={`https://explorer.celo.org/alfajores/tx/${message.receipt.transactionHash}`}
                    >
                      <strong>{message.transaction}</strong>
                    </a>
                  );
                })
              : body[0].transaction}
          </span>
          <div className="flex flex-row">
            {type === "success" ? (
              <button
                className="rounded-2xl bg-white py-2 px-12"
                onClick={() => {
                  dispatch(closeModal());
                  dispatch(getAssetsBalances());
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
            ) : (
              <button
                className="rounded-2xl bg-white py-2 px-12"
                onClick={() => {
                  dispatch(closeModal());
                  navigate("/wallet");
                }}
              >
                Wallet
              </button>
            )}
            <button
              className="text-white ml-5 rounded-2xl bg-gradient py-2 px-12"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
