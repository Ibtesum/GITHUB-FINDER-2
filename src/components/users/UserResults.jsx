import React, { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

const UserResults = () => {
    const {users, loading, fetchUsers} = useContext(GithubContext)


  useEffect(() => {
    fetchUsers();
  }, []);

  

  if (!loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map((user) => (
            <UserItem key={user.id} user = {user} />
        ))}
      </div>
    );
  } else {
    return <Spinner/>
  }
};

export default UserResults;
