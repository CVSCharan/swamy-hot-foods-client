import React, { useState, useEffect } from "react";
import { useShopStatus } from "../context/StatusContext";
import { useLogo } from "../context/LogoCoontext";
import { WaveText } from "./TextAnimation";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import GoogleReviews from "./CutomGoogleRatings";
import Footer from "./Footer";
import GetDirectionsButton from "./GMapsDirection";
import { Helmet } from "react-helmet";

const Landing = () => {
  const { shopStatus, cooking } = useShopStatus();
  const { logoUrl } = useLogo();
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const checkTimeStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay(); // Sunday is 0
      const time = hours * 60 + minutes;

      // Define time intervals
      const morningClosingSoon = 10 * 60 + 45; // 10:45 AM
      const morningClosed = 11 * 60; // 11:00 AM
      const afternoonOpening = 16 * 60 + 30; // 4:30 PM
      const eveningClosingSoon = 20 * 60 + 45; // 8:45 PM
      const eveningClosed = 21 * 60; // 9:00 PM
      const nextMorningOpening = 5 * 60 + 30; // 5:30 AM

      // Clear message on Sundays
      if (day === 0) {
        setCurrentMessage("");
        return;
      }

      if (shopStatus) {
        if (time === morningClosingSoon || time === eveningClosingSoon) {
          setCurrentMessage("We are closing soon..!");
        } else {
          setCurrentMessage("");
        }
      } else {
        if (time >= morningClosed && time < afternoonOpening) {
          setCurrentMessage("Visit us back at 4:30 PM.");
        } else if (time >= eveningClosed || time < nextMorningOpening) {
          setCurrentMessage("Visit us tomorrow by 5:30 AM.");
        } else {
          setCurrentMessage("");
        }
      }
    };

    // Check the time immediately and set an interval to update every minute
    checkTimeStatus();
    const timer = setInterval(checkTimeStatus, 60000);

    return () => clearInterval(timer);
  }, [shopStatus]);

  return (
    <main id="Landing" className="App">
      <Helmet>
        <title>Swamy's Hot Foods - Pure Veg Restaurant in Nellore</title>
        <meta
          name="description"
          content="Swamy's Hot Foods is a pure vegetarian restaurant in Nellore. Offering delicious meals with convenient hours and excellent Google reviews."
        />
        <meta
          name="keywords"
          content="Swamy's Hot Foods, vegetarian restaurant, Nellore food, pure veg, restaurant near Nellore railway station"
        />
        <link rel="canonical" href="https://swamyshotfoods.shop" />
      </Helmet>

      <div className="landing-container-one">
        <img
          className="landing-logo"
          src={logoUrl}
          alt="Swamy's Hot Foods Landing Logo"
          key={logoUrl}
          loading="lazy"
        />
        <div className="title-heading-container">
          <h2 className="quicksand-text title-heading">Swamy's Hot Foods</h2>
          <span className="macondo-regular title-heading-span">
            --- Pure Veg ---
          </span>
        </div>

        <h2 className="cinzel-text address-heading">Address</h2>
        <h3 className="quicksand-text address-body">
          7-1-931, Opp. road of Nellore railway station west entrance,
        </h3>
        <h3 className="quicksand-text address-body">
          Railway feeders road, Nellore - 524001.
        </h3>

        {cooking ? (
          <div className="cooking-container">
            <img
              src="/cooking.gif"
              className="cooking-img"
              alt="Cooking Animation"
              loading="lazy"
            />
            <WaveText text="Cooking..!!" />
          </div>
        ) : (
          <div
            className={`restaurant-status ${shopStatus ? "open" : "closed"}`}
          >
            {shopStatus ? "We are Open! 😊" : "Sorry, We're Closed Now. 😔"}
          </div>
        )}

        {currentMessage && (
          <div
            className={`status-message ${
              currentMessage.includes("closing") ? "warning" : "info"
            }`}
          >
            {currentMessage}
          </div>
        )}

        <div className="call-us-container">
          <a href="tel:+91 9642415385" className="josefin-sans-text call-us-button">
            <i className="fa-solid fa-phone"></i> +91 9642415385
          </a>
          <GetDirectionsButton />
        </div>
      </div>

      <div className="landing-container-two">
        <GoogleReviews />
      </div>
      <Footer />
    </main>
  );
};

export default Landing;