import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_GITHUB_URL}/users`
    );

    const data = await response.json();
    setUsers(data);
    setLoading(false);
    console.log(data);
  };

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
