import React from "react";

const GetDirectionsButton = () => {
  // Your Place ID
  const PLACE_ID = "ChIJmYN2XqONTDoR_zgIHSRpnfI";

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination_place_id=${PLACE_ID}`,
      "_blank"
    );
  };

  return (
    <button onClick={handleGetDirections} className="directions-button">
      Get Directions
    </button>
  );
};

export default GetDirectionsButton;
