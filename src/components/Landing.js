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
  const { shopStatus, cooking, holiday } = useShopStatus();
  console.log(holiday);
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
      const nightClosed = 23 * 60 + 30; // 11:30 PM
      const nextMorningOpening = 5 * 60 + 30; // 5:30 AM

      // Clear message on Sundays
      if (day === 0) {
        setCurrentMessage("");
        return;
      }

      // Logic to hide the message between 11:30 PM and 10:45 AM
      if (time >= nightClosed || time < morningClosingSoon) {
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
        } else if (time >= eveningClosed && time < nightClosed) {
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

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {`
             {
               "@context": "https://schema.org",
               "@type": "Restaurant",
               "name": "Swamy's Hot Foods",
               "address": {
                 "@type": "PostalAddress",
                 "streetAddress": "7-1-931, Opp. road of Nellore railway station west entrance",
                 "addressLocality": "Nellore",
                 "postalCode": "524001",
                 "addressCountry": "IN"
               },
               "telephone": "+91 9642415385",
               "openingHours": [
                 "Mo-Sa 05:30-11:00",
                 "Mo-Sa 16:30-21:00"
               ],
               "servesCuisine": "Vegetarian",
               "url": "https://swamyshotfoods.shop"
             }
             `}
      </script>

      <div className="landing-container-one">
        {logoUrl && (
          <img
            className="landing-logo"
            src={logoUrl}
            alt="Swamy's Hot Foods Landing Logo"
            key={logoUrl}
            loading="lazy"
          />
        )}
        {!logoUrl && (
          <div
            style={{
              height: "5vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="logo-loader"></span>
          </div>
        )}
        <div className="title-heading-container">
          <h2 className="quicksand-text title-heading">Swamy's Hot Foods</h2>
          <span className="macondo-regular title-heading-span">
            --- Pure Veg ---
          </span>
        </div>

        <div className="address-container">
          <GetDirectionsButton />
          <h3 className="quicksand-text address-body">
            7-1-931, Opp. road of Nellore railway station west entrance,
          </h3>
          <h3 className="quicksand-text address-body">
            Railway feeders road, Nellore - 524001.
          </h3>
        </div>

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

        {!holiday ? (
          <>
            {currentMessage !== "" && (
              <div
                className={`status-message ${
                  currentMessage.includes("closing") ? "warning" : "info"
                }`}
              >
                {currentMessage}
              </div>
            )}
          </>
        ) : (
          <div className={`status-message ${"warning"}`}>
            It's a Holiday Today
          </div>
        )}

        <div className="call-us-container">
          <a
            href="tel:+91 9642415385"
            className="josefin-sans-text call-us-button"
          >
            <i className="fa-solid fa-phone"></i> +91 9642415385
          </a>
        </div>

        <div className="working-hours">
          <h2>Working Hours</h2>
          <div className="hours-container">
            <div className="hours-item">
              <span className="josefin-sans-text time-label">
                Monday - Saturday
              </span>
              <div className="hours-item-sub">
                <AccessTime style={{ fontSize: "1.4rem", color: "#FF6347" }} />
                <span className="josefin-sans-text time">
                  5:30 AM - 11:00 AM
                </span>
              </div>
              <div className="hours-item-sub">
                <AccessTime style={{ fontSize: "1.4rem", color: "#FF6347" }} />
                <span className="josefin-sans-text time">
                  4:30 PM - 9:00 PM
                </span>
              </div>
            </div>
            <div className="hours-item-holiday">
              <CalendarToday sx={{ fontSize: "1.4rem", color: "#FF6347" }} />
              <span className="josefin-sans-text time-label">
                Sunday's holiday
              </span>
            </div>
          </div>
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
