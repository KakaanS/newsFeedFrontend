import { useState } from "react";
import api from "../../middleware/api";
import { useAuth } from "../../context/AuthCtx";

const InviteUsers = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [invitationSent, setInvitationSent] = useState(false);
  const { accessToken } = useAuth() as { accessToken: string };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email,
      name,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    };

    try {
      const { status } = await api.post("/identity/invite", userData, {
        headers,
      });
      if (status === 200) {
        setInvitationSent(true);
      } else {
        console.error("login failed");
      }
    } catch (error) {
      console.error(error, "Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setInvitationSent(false);
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
            }}
          />
        </label>
        <button type="submit">Invite</button>
      </form>
      {invitationSent && <p>Invitation sent</p>}
    </div>
  );
};

export default InviteUsers;
