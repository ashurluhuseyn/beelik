import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [pageMode, setPageMode] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/corporate")) {
      setPageMode(false);
    } else {
      setPageMode(true);
    }
  }, [location]);

  return (
    <ThemeContext.Provider value={{ pageMode, setPageMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
