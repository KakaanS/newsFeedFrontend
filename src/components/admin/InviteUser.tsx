//Tools
import { useState } from "react";

//Content
import "./admin.css";
import api from "../../middleware/api";

const InviteUsers = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [invitationSent, setInvitationSent] = useState(false);
  const [error, setError] = useState("");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      name,
    };

    try {
      const { status } = await api.post("/identity/invite", userData);
      if (status === 200) {
        setInvitationSent(true);
        setError("");
      } else {
        console.error("login failed");
      }
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessages = error.response.data.error;
      setError(errorMessages);
      console.error(error, "Something went wrong");
    }
  };

  return (
    <div className="inviteUsersContainer">
      <h3>Invite New User To Newsfeed</h3>
      <form className="inviteFormContainer" onSubmit={handleInvite}>
        <div className="inviteForm">
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInvitationSent(false);
                setError("");
              }}
            />
          </label>
          <label>
            Name:
            <input
              type="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setInvitationSent(false);
                setError("");
              }}
            />
          </label>
        </div>
        <button type="submit">Invite</button>
      </form>
      {invitationSent && <p>Invitation sent</p>}
      <p>{error}</p>
    </div>
  );
};

export default InviteUsers;
