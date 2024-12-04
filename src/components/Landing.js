import React from "react";
import { useShopStatus } from "../context/StatusContext";
import GoogleReviewsComp from "./GoogleRatingsComp";
import { useLogo } from "../context/LogoCoontext";
import { WaveText } from "./TextAnimation";

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
        />
        <div className="title-heading-container">
          <h2 className="macondo-regular title-heading">Swamy's hot foods</h2>
          <span className="macondo-regular  title-heading-span">
            --- Pure Veg ---
          </span>
        </div>
        <h2 className="cinzel-text address-heading">Address:</h2>
        <h3 className="quicksand-text address-body">
          7-1-931, Opp. road, nellore railway station west entrance,
        </h3>
        <h3 className="quicksand-text address-body">
          Railway feeders road, Nellore - 524001.
        </h3>

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
      </div>
      <div className="landing-container-two">
        <GoogleReviewsComp />
      </div>
    </main>
  );
};

export default Landing;
