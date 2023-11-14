import api from "../../middleware/api";
import { TypeInvitedUser } from "./EditUsers";

interface InvitedUserProps {
  user: TypeInvitedUser;
  handleUpdateUsers: () => void;
}

const InvitedUsers: React.FC<InvitedUserProps> = ({
  user,
  handleUpdateUsers,
}) => {
  const deleteInvite = async (email: string) => {
    const userData = {
      email,
    };
    try {
      const response = await api.delete("/identity/invite", {
        data: userData,
      });
      if (response.status === 200) {
        return;
      } else {
        console.error("Deleted invite user Error", response);
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  return (
    <div className="users" key={user.invitedUser_id}>
      <p className="username">{user.name}</p>
      <p className="email">{user.email}</p>
      <div className="changeRole">
        <button
          className="buttonInUsers"
          onClick={() => {
            deleteInvite(user.email);
            handleUpdateUsers();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default InvitedUsers;
