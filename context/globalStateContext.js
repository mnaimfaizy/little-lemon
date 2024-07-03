import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{ isOnboardingCompleted, setIsOnboardingCompleted }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
