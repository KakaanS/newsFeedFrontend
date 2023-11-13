import { useState, useEffect } from "react";
import api from "../../middleware/api";
import "./admin.css";
import User from "./User";

export type TypeUser = {
  user_id: string;
  username: string;
  email: string;
  role_name: string;
};

const EditUsers = () => {
  const [users, setUsers] = useState([]);
  const [updateUsers, setUpdateUsers] = useState(false);

  const handleUpdateUsers = () => {
    setUpdateUsers(!updateUsers);
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/users/getAll");
      if (response.status === 200) {
        const data = response.data;
        setUsers(data);
      } else {
        console.error("Get Users failed", response);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  useEffect(() => {
    console.log("useEffect get users");
    console.log("UpdateUsers", updateUsers);
    getUsers();
  }, [updateUsers]);

  return (
    <div className="editUsersContainer">
      <h2> Users</h2>

      <div className="usersHeader">
        <p className="username">Username</p>
        <p className="email">Email</p>
        <p className="role">Role</p>
        <p className="changeRole">Change Role</p>
      </div>
      {users.map((user: TypeUser) => (
        <User
          key={user.user_id}
          user={user}
          handleUpdateUsers={handleUpdateUsers}
        />
      ))}
    </div>
  );
};

export default EditUsers;
