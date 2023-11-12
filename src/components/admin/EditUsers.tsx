import { useState, useEffect } from "react";
import api from "../../middleware/api";
import "./admin.css";

type TypeUser = {
  user_id: string;
  username: string;
  email: string;
  role_name: string;
};

const EditUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleToSet, setRoleToSet] = useState<"admin" | "user">("user");

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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeRole = async (userId: string) => {
    try {
      const response = await api.put("/users/setRoles", {
        userId,
        roleName: roleToSet,
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("Role changed", data);
      } else {
        console.error("Change Role failed", response);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  const User = (user: TypeUser) => {
    return (
      <div className="inviteUsersContainer">
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.role_name}</p>
        <button onClick={() => changeRole(user.user_id)}>Change Role</button>
      </div>
    );
  };

  return (
    <div className="inviteUsersContainer">
      <h2>Edit Users</h2>
      <h4>Roletoset: {roleToSet}</h4>

      <button onClick={() => setRoleToSet("admin")}>Admin</button>
      <button onClick={() => setRoleToSet("user")}>User</button>
      {users.map((user: TypeUser) => (
        <User key={user.user_id} {...user} />
      ))}
    </div>
  );
};

export default EditUsers;
