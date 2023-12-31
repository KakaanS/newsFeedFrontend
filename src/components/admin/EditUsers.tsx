import { useState, useEffect } from "react";
import api from "../../middleware/api";
import "./admin.css";
import User from "./User";
import InvitedUsers from "./InvitedUsers";
import { AuthContextType, useAuth } from "../../context/AuthCtx";
interface EditUsersProps {
  updateUsers: boolean;
  handleUpdateUsers: () => void;
}

export type TypeUser = {
  user_id: string;
  username: string;
  email: string;
  role_name: string;
};

export type TypeInvitedUser = {
  invitedUser_id: string;
  name: string;
  email: string;
};

const EditUsers: React.FC<EditUsersProps> = ({
  updateUsers,
  handleUpdateUsers,
}) => {
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const { userId } = useAuth() as AuthContextType;
  const activeUserId = userId as string;

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

  const getInvitedUsers = async () => {
    try {
      const response = await api.get("/identity/invite");
      if (response.status === 200) {
        const data = response.data;
        setInvitedUsers(data);
      } else {
        console.error("Get Invited Users failed", response);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };
  const handleUsersWhenDeleted = (userId: string) => {
    const index = users.findIndex((user: TypeUser) => user.user_id === userId);
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  useEffect(() => {
    getUsers();
    getInvitedUsers();
  }, [updateUsers]);

  return (
    <>
      <div className="editUsersContainer">
        <h2> Users</h2>

        <div className="usersHeader">
          <p className="username">Username</p>
          <p className="email">Email</p>
          <p className="role">Role</p>
          <p className="changeRole">Change Role</p>
          <p className="deleteUser">Delete</p>
        </div>
        {users.map((user: TypeUser) => (
          <User
            key={user.user_id}
            user={user}
            handleUpdateUsers={handleUpdateUsers}
            activeUser={activeUserId === user.user_id}
            activeUserId={activeUserId}
            handleUsersWhenDeleted={handleUsersWhenDeleted}
          />
        ))}
      </div>
      <div className="editUsersContainer">
        <h2> Invited Users</h2>

        <div className="usersHeader">
          <p className="username">Name</p>
          <p className="email">Email</p>
          <p className="changeRole">Delete</p>
        </div>
        {invitedUsers.map((user: TypeInvitedUser) => (
          <InvitedUsers
            key={user.invitedUser_id}
            user={user}
            handleUpdateUsers={handleUpdateUsers}
          />
        ))}
      </div>
    </>
  );
};

export default EditUsers;
