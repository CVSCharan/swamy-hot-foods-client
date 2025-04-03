import React, { useState, useEffect, useCallback } from "react";
import "./GoogleReviewsComponent.css";
import { useLogo } from "../context/LogoCoontext";
import Confetti from "react-confetti";

// Static reviews data for place ID: ChIJmYN2XqONTDoR_zgIHSRpnfI
const reviewsData = [
  {
    author_name: "Ravindra V",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "The quality of tiffins is very good and it's pure veg hotel. Near by railway station. Initially hesitant to go inside as the place doesn't look good but took parcel by seeing a lot of crowd. It's worth trying.",
  },
  {
    author_name: "mamidi sudeep",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "The taste of the available breakfast items are superb and the quality and quantity is worthy the amount we pay.sambar taste is very tasty.",
  },
  {
    author_name: "rajesh nare",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    relative_time_description: "a year ago",
    text: "Food quality is good. But quantity is not satisfactory for the price. For an average eater, it costs around ₹140 to feel stomach full.",
  },
  {
    author_name: "way2 tech",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 4,
    relative_time_description: "2 years ago",
    text: "This place is real nice for tasty tiffins,I can say it has a nice taste to a morning tiffins near railway station.I can sure say as Nellore is for best food and these hotel is a fine example for tiffins....I can also say it's clean very hygienic and good atmosphere.",
  },
  {
    author_name: "mohuk khatri",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    relative_time_description: "a week ago",
    text: "Tasty food. Hygiene maintained. Must visit. Location is right opposite to Nellore Railway Station.",
  },
  {
    author_name: "Anwarbasha Shaik",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "Delicious , Sambar,idly,dosa,.....What not ...Everything is super tasty",
  },
];

const GoogleReviewsComonent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { logoUrl } = useLogo();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
    );
  };

  // Set up autoplay
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Update window dimensions when window resizes
  useEffect(() => {
    const handleResize = () => {
      setConfettiPosition({
        ...confettiPosition,
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [confettiPosition]);

  // Handle review button click
  const handleReviewClick = (e) => {
    e.preventDefault();
    
    // Calculate viewport-relative position for confetti
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setConfettiPosition({
      x: 0,
      y: scrollTop,
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    setShowConfetti(true);
    
    // After 2.5 seconds, open the review page
    setTimeout(() => {
      window.open("https://g.page/r/Cf84CB0kaZ3yEBM/review", "_blank", "noopener,noreferrer");
      
      // Hide confetti after a bit more time
      setTimeout(() => {
        setShowConfetti(false);
      }, 500);
    }, 2500);
  };

  return (
    <div className="google-reviews-wrapper">
      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          <Confetti
            width={confettiPosition.width}
            height={confettiPosition.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
            colors={['#ff6b3d', '#ffb347', '#4caf50', '#8bc34a', '#4169e1']}
          />
        </div>
      )}
      
      <div
        className="google-reviews-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="google-card">
          <div className="logo-container">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Swamy's Hot Foods Logo"
                className="review-logo"
              />
            ) : (
              <div className="logo-circle">
                <span className="logo-text">YOUR LOGO HERE</span>
              </div>
            )}
          </div>

          <h2 className="support-text">Support Our Small Business</h2>

          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="big-star">
                ★
              </span>
            ))}
          </div>

          <h1 className="review-heading">
            REVIEW US
            <br />
            ON GOOGLE
          </h1>

          <p className="review-description">
            Your Opinion helps us reach more people!
            <br />
            Rate us only if Impressed with our
            <br />
            products or service!
          </p>

          <a
            href="https://g.page/r/Cf84CB0kaZ3yEBM/review"
            className="review-link-button"
            onClick={handleReviewClick}
            aria-label="Review us on Google"
            style={{
              backgroundColor: "#8A2BE2", // Violet color
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(138, 43, 226, 0.3)"
            }}
          >
            Click Here
          </a>
        </div>

        <div className="carousel-section">
          <h3 className="testimonial-heading">What Our Customers Say</h3>

          <div className="carousel-container">
            <button className="carousel-button prev" onClick={prevSlide}>
              &#10094;
            </button>

            <div className="carousel-content">
              <div className="review-card">
                <div className="review-content">
                  <div className="review-rating">
                    {renderStars(reviewsData[currentIndex].rating)}
                  </div>
                  <p className="review-text">
                    "{reviewsData[currentIndex].text}"
                  </p>
                  <div className="review-footer">
                    <span className="reviewer-name">
                      — {reviewsData[currentIndex].author_name}
                    </span>
                    <span className="review-time">
                      {reviewsData[currentIndex].relative_time_description}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-button next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>

          <div className="carousel-indicators">
            {reviewsData.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewsComonent;
