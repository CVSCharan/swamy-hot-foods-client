import React from "react";

const CustomGoogleMap = () => {
  // Your Google Place ID
  const PLACE_ID = "ChIJmYN2XqONTDoR_zgIHSRpnfI";

  return (
    <div className="google-map-container">
      <iframe
        title="Google Map"
        width="100%"
        height="100"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=place_id:${PLACE_ID}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CustomGoogleMap;
