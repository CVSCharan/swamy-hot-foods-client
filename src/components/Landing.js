import React from "react";
import { useShopStatus } from "../context/StatusContext";
import GoogleReviewsComp from "./GoogleRatingsComp";

const Landing = () => {
  const { shopStatus } = useShopStatus();

  return (
    <main id="Landing" className="App">
      <div className="landing-container-one">
        <img
          className="landing-logo"
          src="/swamy_restaurant_logo.jpg"
          alt="Swamy's Hot Foods Logo"
        />
        <h2 className="cinzel-text title-heading">
          Swamy's Hot Foods (pure veg).
        </h2>
        <h2 className="quicksand-text address-heading">Address:</h2>
        <h3 className="quicksand-text address-body">
          7-1-931, railway station, Opp road, Railway Feeders Rd,
        </h3>
        <h3 className="quicksand-text address-body">
          Nellore, Andhra Pradesh - 524001
        </h3>

        {/* Restaurant Open/Closed Status */}
        <div className={`restaurant-status ${shopStatus ? "open" : "closed"}`}>
          {shopStatus ? "We are Open! 😊" : "Sorry, We're Closed. 😔"}
        </div>
      </div>
      <div className="landing-container-two">
        <GoogleReviewsComp />
      </div>
    </main>
  );
};

export default Landing;
