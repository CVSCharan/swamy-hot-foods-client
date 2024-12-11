import React from "react";
import { useShopStatus } from "../context/StatusContext";
import GoogleReviewsComp from "./GoogleRatingsComp";
import { useLogo } from "../context/LogoCoontext";
import { WaveText } from "./TextAnimation";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import GoogleReviews from "./CutomGoogleRatings";
import Footer from "./Footer";
import CustomGoogleMap from "./CustomGMaps";
import GetDirectionsButton from "./GMapsDirection";

const Landing = () => {
  const { shopStatus, cooking } = useShopStatus();
  const { logoUrl } = useLogo();

  console.info("Landing Logo URL:", logoUrl);

  return (
    <main id="Landing" className="App">
      <div className="landing-container-one">
        <img
          className="landing-logo"
          src={logoUrl}
          alt="Swamy's Hot Foods Landing Logo"
          key={logoUrl} // Adding key prop to force re-render
          loading="lazy"
        />
        <div className="title-heading-container">
          <h2 className="quicksand-text title-heading">Swamy's Hot Foods</h2>
          <span className="macondo-regular  title-heading-span">
            --- Pure Veg ---
          </span>
        </div>
        <h2 className="cinzel-text address-heading">Address</h2>
        <h3 className="quicksand-text address-body">
          7-1-931, Opp. road of nellore railway station west entrance,
        </h3>
        <h3 className="quicksand-text address-body">
          Railway feeders road, Nellore - 524001.
        </h3>
        <GetDirectionsButton />
        {cooking ? (
          <div className="cooking-container">
            <img src="/cooking.gif" className="cooking-img" alt="Cooking Img" />
            <WaveText text="Cooking..!!" />
          </div>
        ) : (
          <div
            className={`restaurant-status ${shopStatus ? "open" : "closed"}`}
          >
            {shopStatus ? "We are Open! 😊" : "Sorry, We're Closed Now. 😔"}
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
        {/* <GoogleReviewsComp /> */}
        <GoogleReviews />
      </div>
      <Footer />
    </main>
  );
};

export default Landing;
