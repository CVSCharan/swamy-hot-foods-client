import React, { useState, useEffect } from "react";
import { useShopStatus } from "../context/StatusContext";
import { useLogo } from "../context/LogoCoontext";
import { WaveText } from "./TextAnimation";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import GoogleReviews from "./CutomGoogleRatings";
import Footer from "./Footer";
import GetDirectionsButton from "./GMapsDirection";
import { Helmet } from "react-helmet";
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Typewriter } from "./TypewriterEffect";

const Landing = () => {
  const {
    shopStatus,
    cooking,
    holiday,
    holidayTxt,
    noticeBoard,
    noticeBoardTxt,
  } = useShopStatus();
  const { logoUrl } = useLogo();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919642415385", "_blank");
  };

  useEffect(() => {
    console.log(noticeBoardTxt);
  }, [noticeBoardTxt]);

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
          <div className={`status-message ${"warning"}`}>{holidayTxt}</div>
        )}

        <div className="call-us-container">
          <a
            href="tel:+91 9642415385"
            className="josefin-sans-text call-us-button"
          >
            <i className="fa-solid fa-phone"></i> +91 9642415385
          </a>
        </div>

        {/* Notice Board Section */}
        {noticeBoard && (
          <>
            {noticeBoardTxt &&
              typeof noticeBoardTxt === "string" &&
              noticeBoardTxt.trim() !== "" && (
                <div className="notice-board-container">
                  <h3 className="josefin-sans-text notice-board-title">
                    Notice Board
                  </h3>
                  <p
                    style={{ whiteSpace: "pre-wrap" }}
                    className="notice-board-message"
                  >
                    <Typewriter
                      text={noticeBoardTxt}
                      noticeBoard={noticeBoard}
                    />
                  </p>
                </div>
              )}
          </>
        )}

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
      <Fab
        color="success"
        aria-label="chat"
        onClick={handleWhatsAppClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
        }}
      >
        <WhatsAppIcon
          sx={{ color: "white" }}
          style={{ color: "#fff", fontSize: "2rem" }}
        />
      </Fab>
      <Footer />
    </main>
  );
};

export default Landing;
