import React from "react";
import UserResults from "../components/users/UserResults";
import UserSearch from "../components/users/UserSearch";

const Home = () => {
  // console.log(process)
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  );
};

export default Home;
