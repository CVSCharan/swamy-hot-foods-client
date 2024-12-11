import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const GetDirectionsButton = () => {
  // Your Place ID and fallback destination address
  const PLACE_ID = "ChIJmYN2XqONTDoR_zgIHSRpnfI";
  const DESTINATION_ADDRESS = "1600 Amphitheatre Pkwy, Mountain View, CA"; // Replace with your actual location

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        DESTINATION_ADDRESS
      )}&destination_place_id=${PLACE_ID}`,
      "_blank"
    );
  };

  return (
    <button onClick={handleGetDirections} className="directions-button">
      <LocationOnIcon className="directions-icon" sx={{ fontSize: "22px" }} />
    </button>
  );
};

export default GetDirectionsButton;
