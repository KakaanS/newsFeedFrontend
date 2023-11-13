import { useState, useEffect } from "react";
import api from "../../middleware/api";
import { useAuth } from "../../context/AuthCtx";
import "./admin.css";

type TypeUser = {
  user_id: string;
  username: string;
  email: string;
  role_name: string;
};

const EditUsers = () => {
  const [users, setUsers] = useState([]);
  const [updateUsers, setUpdateUsers] = useState(false);

  const { accessToken } = useAuth() as { accessToken: string };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/users/getAll", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          console.log("Users", data);
          setUsers(data);
        } else {
          console.error("Get Users failed", response);
        }
      } catch (error) {
        console.error(error, "Something went wrong");
      }
    };
    getUsers();
  }, [accessToken, updateUsers]);

  const changeRole = async (userId: string, roleToSet: string) => {
    try {
      const response = await api.put(
        "/users/setRoles",
        { userId, roleName: roleToSet },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
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
    const [roleToSet, setRoleToSet] = useState(user.role_name);

    useEffect(() => {
      toggleRole();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleRole = () => {
      if (roleToSet === "admin") {
        setRoleToSet("user");
      } else if (roleToSet === "user") {
        setRoleToSet("admin");
      } else {
        setRoleToSet("user");
      }
    };

    return (
      <div className="users">
        <p className="username">{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="role">{user.role_name}</p>
        <div className="changeRole">
          <button onClick={toggleRole} className="buttonInUsers">
            Change Role To {`->`} {roleToSet}
          </button>
          <button
            className="buttonInUsers"
            onClick={() => {
              changeRole(user.user_id, roleToSet);
              setUpdateUsers(!updateUsers);
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

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
        <User key={user.user_id} {...user} />
      ))}
    </div>
  );
};

export default EditUsers;
