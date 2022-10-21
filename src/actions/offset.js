import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const createOffsetRequest = (offsetDetails) => {
  return async (dispatch) => {
    dispatch(offsetStartAction());

    const resp = await fetchWithoutToken("offsets", offsetDetails, "POST");
    const body = await resp.json();

    console.log(body);
    dispatch(finishOffsetAction());
    if (body.ok) {
      Swal.fire(
        "Done!",
        "Your request has been made. Please check your email for further details.",
        "success"
      );
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
    }
  };
};

const offsetStartAction = () => ({
  type: types.offsetRequestStart,
});

const finishOffsetAction = () => ({
  type: types.offsetRequestFinish,
});

export const getOffsetRequests = () => {
  return async (dispatch) => {
    dispatch(requestsGetStartAction());

    const resp = await fetchWithToken("offsets");
    const body = await resp.json();

    if (body.ok) {
      dispatch(requestsGetFinishAction(body.offsetRequests));
    } else {
      Swal.fire("Error", "Something went wrong =(", "error");
    }
  };
};

const requestsGetStartAction = () => ({
  type: types.offsetRequestsGetStart,
});

const requestsGetFinishAction = (requests) => ({
  type: types.offsetRequestsGetFinish,
  payload: requests,
});
