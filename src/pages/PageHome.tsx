import { useAuth } from "../context/AuthCtx";

interface AuthContextType {
  logout: () => void;
}

const PageHome = () => {
  const { logout } = useAuth() as AuthContextType;
  return (
    <>
      <div>PageHome</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default PageHome;
