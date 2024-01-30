import { removeAlert, setAlert } from "@/redux/slices/alertSlice";
const { v4: uuidv4 } = require('uuid');

export const set_Alert =
  (msg, alertType, timeout = 3000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch(setAlert({ msg, alertType, id }));

    setTimeout(() => dispatch(removeAlert(id)), timeout);
  };
