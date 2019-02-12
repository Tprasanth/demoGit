import * as ActionTypes from "./ActionTypes";

import axios from "react-native-axios";

export const callWebservice = () => {
  return dispatch => {
    dispatch(serviceActionPending());
    axios
      .get("https://api.github.com/users/supreetsingh247/repos")
      .then(response => {
        dispatch(serviceActionSuccess(response.data));
      })
      .catch(error => {
        dispatch(serviceActionError(error));
      });
  };
};

export const serviceActionPending = () => ({
  type: ActionTypes.SERVICE_PENDING
});

export const serviceActionError = error => ({
  type: ActionTypes.SERVICE_ERROR,
  error: error
});

export const serviceActionSuccess = data => ({
  type: ActionTypes.SERVICE_SUCCESS,
  data: data
});
