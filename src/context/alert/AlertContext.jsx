import alertReducer from "./AlertReducer";
import { createContext, useReducer } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const intialAlert = null;

  const [state, dispatch] = useReducer(alertReducer, intialAlert);

  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  };

  return <AlertContext.Provider value={{alert: state, setAlert}}>{children}</AlertContext.Provider>;
};

export default AlertContext