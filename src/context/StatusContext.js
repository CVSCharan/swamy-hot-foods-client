import React, { createContext, useContext, useState, useEffect } from "react";

// WebSocket server URL
const WS_URL = "ws://localhost:3001";

// Create context
const StatusContext = createContext();

export const ShopStatusProvider = ({ children }) => {
  const [shopStatus, setShopStatus] = useState(() => {
    // Retrieve from localStorage or default to false (closed)
    const savedStatus = localStorage.getItem("shopStatus");

    try {
      return savedStatus ? JSON.parse(savedStatus) : false;
    } catch (error) {
      return false;
    }
  });

  const [socket, setSocket] = useState(null);

  // Create WebSocket connection on mount
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setShopStatus(data.shopStatus); // Update status from WebSocket
    };

    // Save socket for future use
    setSocket(ws);

    // Cleanup WebSocket connection on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Update status on WebSocket and localStorage
  const updateShopStatus = (status) => {
    localStorage.setItem("shopStatus", JSON.stringify(status));
    setShopStatus(status);
    if (socket) {
      socket.send(JSON.stringify({ shopStatus: status })); // Send status to WebSocket server
    }
  };

  return (
    <StatusContext.Provider
      value={{ shopStatus, setShopStatus: updateShopStatus }}
    >
      {children}
    </StatusContext.Provider>
  );
};

// Custom Hook
export const useShopStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useShopStatus must be used within ShopStatusProvider");
  }
  return context;
};
