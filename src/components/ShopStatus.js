import React from "react";
import { useShopStatus } from "../context/StatusContext";

const ShopStatus = () => {
  const { shopStatus, setShopStatus } = useShopStatus();

  const toggleShopStatus = () => {
    setShopStatus(!shopStatus); // Update both localStorage and WebSocket server
  };

  return (
    <section id="Shop Status" className="App">
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
        <h2 className="quicksand-text address-heading">Shop Status</h2>

        {/* Switch for Shop Status */}
        <div className="shop-status-toggle">
          <button
            className={`switch-button ${shopStatus ? "open" : "closed"}`}
            onClick={toggleShopStatus}
          >
            {shopStatus ? "Open" : "Closed"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopStatus;
