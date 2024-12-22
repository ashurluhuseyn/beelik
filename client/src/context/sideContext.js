import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [visibleRight, setVisibleRight] = useState(false);

  const toggleSidebar = () => setVisibleRight(!visibleRight);

  return (
    <SidebarContext.Provider value={{ visibleRight, setVisibleRight, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
