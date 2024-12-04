import React, { createContext, useState, useEffect, useContext } from "react";

const LogoContext = createContext();

export const useLogo = () => {
  return useContext(LogoContext);
};

export const LogoProvider = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState("/swamy_restaurant_logo.jpg");

  const fetchLogo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/uploads/logo.png?t=" + new Date().getTime() // Adding timestamp to avoid caching
      );
      if (response.ok) {
        setLogoUrl(response.url); // Update logo URL from server
        console.info("Logo Fetching Success!!");
      } else {
        console.warn("Default logo not found on the server.");
      }
    } catch (error) {
      console.error("Error fetching default logo:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>
      {children}
    </LogoContext.Provider>
  );
};
