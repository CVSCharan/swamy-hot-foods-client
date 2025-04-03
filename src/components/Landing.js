import React, { useEffect } from "react";
import { useShopStatus } from "../context/StatusContext";
import { useLogo } from "../context/LogoCoontext";
import { WaveText } from "./TextAnimation";
import { AccessTime, CalendarToday } from "@mui/icons-material";
import Footer from "./Footer";
import GetDirectionsButton from "./GMapsDirection";
import { Helmet } from "react-helmet";
import { Typewriter } from "./TypewriterEffect";
import WhatsAppComp from "./WhatsAppComp";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import GoogleReviewsComonent from "./GoogleReviewsComonent";

// Add this import at the top of your file
import "../styles/Landing.css";

const Landing = () => {
  const {
    shopStatus,
    cooking,
    holiday,
    holidayTxt,
    noticeBoard,
    noticeBoardTxt,
    currentStatusMsg,
  } = useShopStatus();
  const { logoUrl } = useLogo();

  useEffect(() => {
    console.log(noticeBoardTxt);
  }, [noticeBoardTxt]);

  // Function to handle sharing
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Swamy's Hot Foods",
          text: "Check out this amazing vegetarian restaurant in Nellore!",
          url: "https://swamyshotfoods.shop",
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert("Your browser does not support the Web Share API.");
    }
  };

  return (
    <main id="Landing" className="App compact-layout">
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

      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="landing-container-one">
          {logoUrl ? (
            <img
              className="landing-logo"
              src={logoUrl}
              alt="Swamy's Hot Foods Landing Logo"
              key={logoUrl}
              loading="lazy"
            />
          ) : (
            <div className="logo-loader-container">
              <span className="logo-loader"></span>
            </div>
          )}

          <div className="title-heading-container">
            <h1 className="quicksand-text title-heading">Swamy's Hot Foods</h1>
            <span className="macondo-regular title-heading-span">
              Pure Vegetarian Delight
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

          <div className="status-badge-container">
            {cooking ? (
              <div className="cooking-container">
                <img
                  src="/cooking.gif"
                  className="cooking-img"
                  alt="Cooking Animation"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif";
                  }}
                />
                <WaveText text="Cooking..!!" />
              </div>
            ) : (
              <div
                className={`restaurant-status ${
                  shopStatus ? "open" : "closed"
                }`}
              >
                {shopStatus ? "We are Open! 😊" : "Sorry, We're Closed Now. 😔"}
              </div>
            )}

            {!holiday ? (
              <>
                {currentStatusMsg && (
                  <div
                    className={`status-message ${
                      currentStatusMsg.includes("Closing")
                        ? "blinking-effect warning"
                        : "info"
                    }`}
                  >
                    {currentStatusMsg}
                  </div>
                )}
              </>
            ) : (
              <div className="status-message warning">{holidayTxt}</div>
            )}
          </div>

          <div className="action-buttons">
            <a href="tel:+91 9642415385" className="action-button call-button">
              <div className="call-animation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 122.9 98.9"
                  fill="currentColor"
                >
                  <path
                    d="M109,98.9H13.7v-14c0.5-16.3,14.9-28.7,23.6-42.8V29.7h14.5v8.9h19.5v-8.9h14.5v12.4C95.2,57.2,109,67,109,84.7V98.9z 
                 M122.5,42.1c0-2.2,0.4-4.4,0.1-6.8c-10.7,3.5-21.1,2.5-31.3-3.1c-0.4,3.8,0.2,7.2,1.6,10.4C96.5,50.6,122.2,53.3,122.5,42.1z 
                 M0.3,42.1c0-2.2-0.4-4.4-0.1-6.8c10.7,3.5,21.1,2.5,31.3-3.1c0.4,3.8-0.2,7.2-1.6,10.4C26.3,50.6,0.5,53.3,0.3,42.1z 
                 M0,31.9C8.6-8.2,115.4-13,122.9,32c-10.4,2.9-21,1.2-31.6-3.6c0.3-2.1-0.2-3.8-1.3-5.2c-6.3-7.9-51.4-8.2-57.2,0.3
                 c-0.9,1.3-1.3,2.9-1.2,4.7C21.1,34.6,10.5,36.1,0,31.9z 
                 M47.2,47.7c2.4,0,4.3,1.9,4.3,4.3s-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3,1.9-4.3,4.3-4.3z 
                 M74.8,71.7c2.4,0,4.3,1.9,4.3,4.3s-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3,1.9-4.3,4.3-4.3z 
                 M61,71.7c2.4,0,4.3,1.9,4.3,4.3s-1.9,4.3-4.3-4.3-4.3-1.9-4.3-4.3,1.9-4.3,4.3-4.3z 
                 M47.2,71.7c2.4,0,4.3,1.9,4.3,4.3s-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3,1.9-4.3,4.3-4.3z"
                  />
                </svg>
              </div>
              <span>Call Us</span>
            </a>

            <button
              onClick={handleShare}
              className="action-button share-button"
            >
              <i className="fa-solid fa-share"></i>
              <span>Share</span>
            </button>

            <Link to="/menu" className="action-button menu-button">
              <RestaurantMenuOutlinedIcon />
              <span>Menu</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Notice Board Section */}
      {noticeBoard &&
        noticeBoardTxt &&
        typeof noticeBoardTxt === "string" &&
        noticeBoardTxt.trim() !== "" && (
          <div className="notice-board-section">
            <div className="notice-board-container">
              <h3 className="notice-board-title">
                <i className="fas fa-bullhorn"></i> Notice Board
              </h3>
              <div className="notice-content">
                <Typewriter text={noticeBoardTxt} noticeBoard={noticeBoard} />
              </div>
            </div>
          </div>
        )}

      <div className="info-section">
        <div className="working-hours">
          <h2 className="section-title">Working Hours</h2>
          <div className="hours-container">
            <div className="hours-item">
              <span className="time-label">Monday - Saturday</span>
              <div className="hours-item-sub">
                <AccessTime />
                <span className="time">5:30 AM - 11:00 AM</span>
              </div>
              <div className="hours-item-sub">
                <AccessTime />
                <span className="time">4:30 PM - 9:00 PM</span>
              </div>
            </div>
            <div className="hours-item-holiday">
              <CalendarToday />
              <span className="time-label">Sunday's holiday</span>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="section-title">Support Our Small Business</h2>
        <div className="chef-image-container">
          <img
            src="/chef-cartoon.webp"
            alt="Chef recommending reviews"
            className="chef-review-image"
          />
        </div>
        <GoogleReviewsComonent />
      </div>

      <WhatsAppComp />
      <Footer />
    </main>
  );
};

export default Landing;
