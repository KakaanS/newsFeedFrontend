import React from "react";

const Login: React.FC = () => {
  return (
    <form>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
