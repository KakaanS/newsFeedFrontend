import { LocationProvider } from "./LocationCtx";
import { AuthProvider } from "./AuthCtx";
import { ReactNode } from "react";

const AllCtx = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <LocationProvider>{children}</LocationProvider>
      </AuthProvider>
    </>
  );
};

export default AllCtx;
