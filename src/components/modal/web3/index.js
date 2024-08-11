import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../store/slices/UI/uiSlice";
import { AcquireSuccess } from "../acquireSuccess";
import { ConnectionError } from "./connectionError";
import { ConnectWalletModal } from "../../connect/ConnectWalletModal";
import { WalletInformation } from "../../connect/WalletInformation";
import { Toc } from "../toc";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(91, 230, 202)",
    boxShadow: "1px 1px 5px 1px #000000",
  },
};

Modal.setAppElement("#root");

export const AppModal = () => {
  const { isOpen, type, title, subtitle, body } = useSelector(
    (state) => state.ui
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={handleCloseModal}
    >
      {type === "acquireSuccess" && (
        <AcquireSuccess title={title} subtitle={subtitle} body={body} />
      )}
      {type === "unsupportedNetwork" && <ConnectionError />}
      {/* {type === "walletOptions" && <WalletOptions />}
      {type === "accountDetails" && <AccountDetails closeModal={closeModal} />}
      {error && <Error errorType={type} closeModal={closeModal} />}
      {type === "editAccount" && <EditAccount closeModal={closeModal} />} */}

      {type === "connectWallet" && <ConnectWalletModal />}
      {type === "walletInfo" && <WalletInformation />}
      {type === "toc" && <Toc />}
    </Modal>
  );
};
