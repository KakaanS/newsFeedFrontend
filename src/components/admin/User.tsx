import { useState, useEffect } from "react";
import api from "../../middleware/api";
import { TypeUser } from "./EditUsers";

interface UserProps {
  user: TypeUser;
  handleUpdateUsers: () => void;
}

const User: React.FC<UserProps> = ({ user, handleUpdateUsers }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user.role_name === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUpdateUsers]);

  const changeRole = async (userId: string, roleToSet: string) => {
    try {
      const response = await api.put("/users/setRoles", {
        userId,
        roleName: roleToSet,
      });
      if (response.status === 200) {
        setIsAdmin(!isAdmin);
        const data = response.data;
        console.log("Role changed", data);
      } else {
        console.error("Change Role failed", response);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete("/users/delete", {
        data: { userId },
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("User deleted", data);
      } else {
        console.error("Delete user failed", response);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  const getRoleText = (inverted: boolean) => {
    if (inverted) {
      if (isAdmin) {
        return "User";
      } else {
        return "Admin";
      }
    } else {
      if (isAdmin) {
        return "Admin";
      } else {
        return "User";
      }
    }
  };

  return (
    <div className="users" key={user.user_id}>
      <p className="username">{user.username}</p>
      <p className="email">{user.email}</p>
      <p className="role">{getRoleText(false)}</p>
      <div className="changeRole">
        <p className="changeTo">Change To: {getRoleText(true)}</p>
        <button
          className="buttonInUsers"
          onClick={() => {
            changeRole(user.user_id, getRoleText(true));
            handleUpdateUsers();
          }}
        >
          Save
        </button>
      </div>
      <div className="deleteUser">
        <button
          className="buttonInUsers"
          onClick={() => {
            deleteUser(user.user_id);
            handleUpdateUsers();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default User;
