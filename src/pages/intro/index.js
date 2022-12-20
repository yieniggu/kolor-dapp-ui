import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginType } from "../../store/slices/NFT";

const IntroPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginGateway = ({ target }) => {
    dispatch(setLoginType(target.name));
    navigate("/signin");
  };

  return (
    <>
      <div className="flex flex-col bg-intro min-h-screen items-center tiny:px-10 sm:px-10 px-4">
        <div className="text-gradient text-xl mt-40">Access to</div>
        <div className="text-white text-xl">Conservation</div>

        <h1 className="text-white text-lg mt-10">
          How do you wish to connect?
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
          <button
            name="web2"
            className="rounded-lg text-white text-sm bg-app-main-100 px-6 py-2"
            onClick={loginGateway}
          >
            Login with email
          </button>

          <button
            name="web3"
            className="rounded-lg text-app-main-100 text-sm bg-white px-6 py-2"
            onClick={loginGateway}
          >
            Login with wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default IntroPage;
