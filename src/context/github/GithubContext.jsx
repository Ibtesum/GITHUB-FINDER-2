import React from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos : []
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
    // console.log(items);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  // Get a single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      // window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Clear User
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
      payload: [],
    });
  };

  // Set Loading function
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        loading: state.loading,
        getUser,
        searchUsers,
        clearUsers,
        repos: state.repos,
        dispatch
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
