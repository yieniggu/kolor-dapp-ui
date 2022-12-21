import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../../../helpers/fetch";
import { resetDao } from "../dao/daoSlice";
import { resetNFT, setLoginType } from "../NFT";
import { resetToken } from "../token/tokenSlice";
import { login, logout, setChecking } from "./authSlice";

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch(setChecking(true));

    const resp = await fetchWithoutToken(
      "auth/new",
      { name, email, password, role: "client" },
      "POST"
    );

    const body = await resp.json();
    console.log(body);

    if (body.ok) {
      saveTokenOnLocalStorage(body.token);

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          role: body.role,
          address: body.address,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }

    return dispatch(setChecking(false));
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch(setChecking(true));
    const resp = await fetchWithoutToken("auth", { email, password }, "POST");

    const body = await resp.json();

    if (body.ok) {
      saveTokenOnLocalStorage(body.token);

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          role: body.role,
          address: body.address,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }

    return dispatch(setChecking(false));
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(resetNFT());
    dispatch(resetToken());
    dispatch(resetDao());
    dispatch(setChecking(false));
  };
};

const saveTokenOnLocalStorage = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("token-init-date", new Date().getTime());
};

export const startChecking = () => {
  return async (dispatch) => {
    dispatch(setChecking(true));
    const resp = await fetchWithToken("auth/refresh");

    const body = await resp.json();
    console.log("checked: ", body);

    if (body.ok) {
      saveTokenOnLocalStorage(body.token);

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          role: body.role,
          address: body.address,
        })
      );
    }

    return dispatch(setChecking(false));
  };
};
