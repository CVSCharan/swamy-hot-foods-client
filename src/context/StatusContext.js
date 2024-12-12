import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Create context
const StatusContext = createContext();

export const ShopStatusProvider = ({ children }) => {
  // Initialize `shopStatus` and `cooking` states
  const [shopStatus, setShopStatus] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [socket, setSocket] = useState(null);

  // Create Socket.io connection on mount
  useEffect(() => {
    console.log("WebSocket URL:", process.env.REACT_APP_SOCKET_URL);
    // Replace with your server URL
    const socketIo = io(process.env.REACT_APP_SOCKET_URL, {
      transports: ["websocket"],
    });

    socketIo.on("connect", () => {
      console.log("Connected to Socket.io server.");
    });

    socketIo.on("statusUpdate", (data) => {
      if (data.shopStatus !== undefined) {
        setShopStatus(data.shopStatus);
      }

      if (data.cooking !== undefined) {
        setCooking(data.cooking);
      }
    });

    // Save socket for future use
    setSocket(socketIo);

    // Cleanup on unmount
    return () => {
      if (socketIo) {
        socketIo.disconnect();
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
      console.log("Emitting shopStatus:", status);
      socket.emit("statusChange", { shopStatus: status });
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
      console.log("Emitting shopStatus:", status);
      socket.emit("statusChange", { cooking: status });
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
