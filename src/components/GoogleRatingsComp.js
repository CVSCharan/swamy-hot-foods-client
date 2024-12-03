import React, { useEffect } from "react";

const GoogleReviewsComp = () => {
  const resizeObserverError = (event) => {
    if (
      event.message ===
      "ResizeObserver loop completed with undelivered notifications."
    ) {
      event.preventDefault();
    }
  };

  window.addEventListener("error", resizeObserverError);

  useEffect(() => {
    // Create a script element for the Elfsight platform
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="custom-google-reviews-widget">
      <h1 className="playwrite-gb-s-text widget-title">Google Reviews</h1>
      <div
        className="elfsight-app-43d6f5c4-e329-4dcd-b9d8-c956d5a6ce77"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviewsComp;
