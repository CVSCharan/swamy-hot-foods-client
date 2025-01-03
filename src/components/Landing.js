import React, { useState, useEffect } from "react";
import { useShopStatus } from "../context/StatusContext";
import { useLogo } from "../context/LogoCoontext";
import { WaveText } from "./TextAnimation";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import GoogleReviews from "./CutomGoogleRatings";
import Footer from "./Footer";
import GetDirectionsButton from "./GMapsDirection";
import { Helmet } from "react-helmet";
import { Typewriter } from "./TypewriterEffect";
import WhatsAppComp from "./WhatsAppComp";

function testClosingSoonLogic(date, shopStatus) {
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  let expectedMessage = "";
  if (shopStatus) {
    if (
      (currentHour === 10 && currentMinute >= 45) ||
      (currentHour === 20 && currentMinute >= 45)
    ) {
      expectedMessage = "Closing Soon...";
    }
  }

  // Simulate the actual function logic
  let actualMessage = "";
  if (shopStatus) {
    if (
      (currentHour === 10 && currentMinute >= 45) ||
      (currentHour === 20 && currentMinute >= 45)
    ) {
      actualMessage = "Closing Soon...";
    }
  }

  // Log the test case
  console.log(`Testing for date: ${date}`);
  console.log(`Expected: "${expectedMessage}", Returned: "${actualMessage}"`);
  console.log(
    expectedMessage === actualMessage ? "✅ Test Passed" : "❌ Test Failed"
  );
}

// Example Test Cases
const testCases = [
  { date: new Date(2025, 0, 1, 10, 44), shopStatus: true }, // Before 10:45 AM
  { date: new Date(2025, 0, 1, 10, 45), shopStatus: true }, // At 10:45 AM
  { date: new Date(2025, 0, 1, 11, 0), shopStatus: true }, // At 11:00 AM
  { date: new Date(2025, 0, 1, 20, 44), shopStatus: true }, // Before 8:45 PM
  { date: new Date(2025, 0, 1, 20, 45), shopStatus: true }, // At 8:45 PM
  { date: new Date(2025, 0, 1, 21, 0), shopStatus: true }, // At 9:00 PM
  { date: new Date(2025, 0, 1, 15, 30), shopStatus: true }, // Midday (not closing soon)
  { date: new Date(2025, 0, 1, 10, 50), shopStatus: false }, // Shop closed
];

// Run the Test Suite
testCases.forEach(({ date, shopStatus }) =>
  testClosingSoonLogic(date, shopStatus)
);

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

  useEffect(() => {
    console.log(noticeBoardTxt);
  }, [noticeBoardTxt]);

  useEffect(() => {
    const updateClosingSoonMessage = () => {
      const currentTime = new Date(); // Get current date and time
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();

      if (shopStatus) {
        // Check for "Closing Soon" conditions
        if (
          (currentHour === 10 && currentMinute >= 45) ||
          (currentHour === 20 && currentMinute >= 45)
        ) {
          setCurrentMessage("We are Closing Soon..!");
        } else {
          setCurrentMessage(""); // Clear message if conditions are not met
        }
      } else {
        setCurrentMessage(""); // Clear message when the shop is closed
      }
    };

    // Update message immediately on shop status or time changes
    updateClosingSoonMessage();

    // Set an interval to check every minute
    const interval = setInterval(updateClosingSoonMessage, 60000);

    // Clear interval on cleanup
    return () => clearInterval(interval);
  }, [shopStatus]);

  useEffect(() => {
    // Function to Run the Test Suite
    function runTests() {
      console.log("Running Tests...\n");
      testCases.forEach(({ date, shopStatus }, index) => {
        console.log(`Test Case ${index + 1}:`);
        testClosingSoonLogic(date, shopStatus);
        console.log("\n"); // Add spacing between test cases
      });
    }

    // Call the Test Suite
    runTests();
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
        <meta property="og:title" content="Swamy's Hot Foods" />
        <meta
          property="og:description"
          content="Delicious pure vegetarian food in Nellore. Visit us today!"
        />
        <meta property="og:image" content="/images/restaurant-image.jpg" />
        <meta property="og:url" content="https://swamyshotfoods.shop" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Swamy's Hot Foods" />
        <meta
          name="twitter:description"
          content="A top-rated vegetarian restaurant in Nellore."
        />
        <meta name="twitter:image" content="/images/restaurant-image.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://swamyshotfoods.shop" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Swamy's Hot Foods",
              "image": "/images/restaurant-image.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "7-1-931, Opp. road of Nellore railway station west entrance",
                "addressLocality": "Nellore",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "524001",
                "addressCountry": "IN"
              },
              "telephone": "+91 9642415385",
              "url": "https://swamyshotfoods.shop",
              "openingHours": "Mo-Sa 05:30-11:00, Mo-Sa 16:30-21:00",
              "image": "https://swamyshotfoods.shop/images/restaurant-image.jpg",
              "sameAs": [
                "https://www.facebook.com/swamys.hotfoods",
                "https://www.instagram.com/swamys.hotfoods"
              ]
            }
          `}
        </script>
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
            {currentMessage && (
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

                  <Typewriter text={noticeBoardTxt} noticeBoard={noticeBoard} />
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

      <WhatsAppComp />
      <Footer />
    </main>
  );
};

export default Landing;
