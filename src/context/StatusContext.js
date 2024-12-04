import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const StatusContext = createContext();

export const ShopStatusProvider = ({ children }) => {
  // Initialize `shopStatus` and `cooking` states
  const [shopStatus, setShopStatus] = useState(false);

  const [cooking, setCooking] = useState(false);

  const [socket, setSocket] = useState(null);

  // Create WebSocket connection on mount
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.shopStatus !== undefined) {
        setShopStatus(data.shopStatus);
      }

      if (data.cooking !== undefined) {
        setCooking(data.cooking);
      }
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

  // Update shop status
  const updateShopStatus = (status) => {
    if (cooking) {
      alert("Cannot open shop while cooking is on.");
      return;
    }
    setShopStatus(status);
    if (socket) {
      socket.send(JSON.stringify({ shopStatus: status }));
    }
  };

  // Update cooking status
  const updateCookingStatus = (status) => {
    if (shopStatus) {
      alert("Cannot start cooking while the shop is open.");
      return;
    }
    setCooking(status);
    if (socket) {
      socket.send(JSON.stringify({ cooking: status }));
    }
  };

  return (
    <StatusContext.Provider
      value={{
        shopStatus,
        setShopStatus: updateShopStatus,
        cooking,
        setCooking: updateCookingStatus,
      }}
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
