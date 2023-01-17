import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get initial results for testing
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();
    console.log(items);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Clear User
  const clearUsers = ()=> {
    dispatch({
      type: "CLEAR_USERS",
      payload: []
    })
  }

  // Set Loading function
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, searchUsers, clearUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
