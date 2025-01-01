import React from "react";
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppComp = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919642415385", "_blank");
  };

  return (
    <Fab
      color="success"
      aria-label="chat"
      onClick={handleWhatsAppClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
      }}
    >
      <WhatsAppIcon style={{ fontSize: "2rem" }} />
    </Fab>
  );
};

export default WhatsAppComp;
