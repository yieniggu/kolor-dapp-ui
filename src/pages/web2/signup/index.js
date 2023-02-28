import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../layout/web2";
import User from "../../../assets/icons/ico_user.png";
import Email from "../../../assets/icons/ico_email.svg";
import Lock from "../../../assets/icons/ico_lock.svg";
import { useForm } from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { register } from "../../../store/slices/auth/thunks";
import { useState } from "react";
import { openModal } from "../../../store/slices/UI/uiSlice";
import { AppModal } from "../../../components/modal/web2";

const SignUp = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formValues;
  const [tocChecked, setTockChecked] = useState(false);

  const [validFields, setValidFields] = useState({
    name: true,
    email: true,
    password: true,
    toc: true,
    allValid: true,
  });

  const validateFields = () => {
    let vName, vEmail, vPassword, vToc, allValid;
    vName = name.length > 4;
    vEmail = email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    vPassword = password.length > 6;
    vToc = tocChecked;

    allValid = vName && vEmail && vPassword && vToc;
    setValidFields({
      name: vName,
      email: vEmail,
      password: vPassword,
      toc: vToc,
      allValid,
    });

    console.log("valid fields: ", validFields);
  };

  const inputChange = (e) => {
    setValidFields({
      name: true,
      email: true,
      password: true,
      toc: true,
    });

    handleInputChange(e);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    validateFields();

    validFields.allValid && dispatch(register(name, email, password));
  };

  const openTocModal = () => {
    dispatch(openModal({ type: "toc" }));
  };

  const navigate = useNavigate();
  return (
    <>
      <AppModal />
      <Layout title="Kolor | Sign Up">
        <div className="flex bg-signin min-h-screen items-center justify-center pt-40 px-4">
          <div className="flex flex-col w-full tiny:w-96 h-136 bg-body rounded-3xl py-6">
            <div className="flex flex-col px-3 sm:px-6 items-center gap-3">
              <div className="text-white text-md py-2">Sign up</div>
              {/* <button className="bg-light rounded-2xl w-full py-3 px-4">
                <div className="flex gap-3 sm:gap-6">
                  <img src={Facebook} alt="facebook" className="w-6" />
                  <div className="text-white">Continue with facebook</div>
                </div>
              </button>
              <button className="bg-light rounded-2xl w-full py-3 px-4">
                <div className="flex gap-3 sm:gap-6">
                  <img src={Google} alt="google" className="w-6" />
                  <div className="text-white">Continue with google</div>
                </div>
              </button>
              <button className="bg-light rounded-2xl w-full py-3 px-4">
                <div className="flex gap-3 sm:gap-6">
                  <img src={Metamask} alt="metamask" className="w-6" />
                  <div className="text-white">Continue with metamask</div>
                </div>
              </button> */}
              <div className="hidden sm:flex w-full py-4">
                <div className="text-white middle-liner items-center justify-center">
                  o
                </div>
              </div>
            </div>
            <div className="flex flex-col px-3 sm:px-6 items-center pt-4 sm:pt-0">
              <div className="flex bg-light rounded-2xl w-full py-3 px-4 gap-4">
                <img src={User} alt="name" className="w-6" />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full"
                  name="name"
                  value={name}
                  onChange={inputChange}
                />
              </div>
              {!validFields.name && (
                <p className="text-red-500">
                  Name must be at least 4 characters long
                </p>
              )}
              <div className="flex bg-light rounded-2xl w-full py-3 px-4 gap-4 mt-4">
                <img src={Email} alt="email" className="w-6" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full"
                  name="email"
                  value={email}
                  onChange={inputChange}
                />
              </div>
              {!validFields.email && (
                <p className="text-red-500">Enter a valid email</p>
              )}
              <div className="flex bg-light rounded-2xl w-full py-3 px-4 gap-4 mt-4">
                <img src={Lock} alt="lock" className="w-7" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  name="password"
                  value={password}
                  onChange={inputChange}
                />
              </div>
              {!validFields.password && (
                <p className="text-red-500">
                  Password must be at least 7 characters long
                </p>
              )}
            </div>

            <div className="flex flex-row my-auto mx-10 text-white gap-2">
              <input
                className="my-auto"
                type="checkbox"
                id="cbox2"
                value={tocChecked}
              />{" "}
              <p>
                By clicking the checkbox you agree the{" "}
                <span
                  onClick={openTocModal}
                  className="cursor-pointer underline hover:text-interaction"
                >
                  Terms and conditions
                </span>
              </p>
            </div>

            <div className="flex flex-col px-3 sm:px-6 items-center gap-2 py-3">
              <div
                onClick={() => navigate("/signin")}
                className="w-full flex flex-row-reverse text-white"
              >
                <div className="cursor-pointer">Already have an account?</div>
              </div>
              <button
                className="button-gradient text-white w-full h-10 rounded-2xl"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
