import { createContext, useContext, useState, ReactNode } from "react";

const LocationContext = createContext({
  adminView: "Admin Panel",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAdminView: (_newView: string) => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useLocationContext() {
  return useContext(LocationContext);
}
interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [adminView, setAdminView] = useState("Admin Panel");

  const updateAdminView = (newView: string) => {
    setAdminView(newView);
  };

  return (
    <LocationContext.Provider value={{ adminView, updateAdminView }}>
      {children}
    </LocationContext.Provider>
  );
}
