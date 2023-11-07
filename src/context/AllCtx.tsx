import { AuthProvider } from "./AuthCtx";
import { ReactNode } from "react";

const AllCtx = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default AllCtx;
