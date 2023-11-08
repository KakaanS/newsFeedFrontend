import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const LocationContext = createContext({
  adminView: "Admin Panel",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAdminView: (_newView: string) => {},
  currentView: "/",
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
  const [currentView, setCurrentView] = useState("adminView");

  const updateAdminView = (newView: string) => {
    setAdminView(newView);
    setCurrentView(newView);
  };

  useEffect(() => {
    const initialLocation = window.location.pathname;
    if (initialLocation === "/") {
      setCurrentView("Home");
    }
    setCurrentView(adminView);
  }, [adminView]);

  const values = {
    adminView,
    updateAdminView,
    currentView,
  };

  return (
    <LocationContext.Provider value={values}>
      {children}
    </LocationContext.Provider>
  );
}
