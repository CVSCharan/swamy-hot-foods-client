import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [overallRating, setOverallRating] = useState(0); // Store overall rating
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/google-reviews`
        );
        console.log(response.data);
        setReviews(response.data.reviews);
        setTotalReviews(response.data.totalReviews);
        setOverallRating(response.data.overallRating); // Set overall rating
        setLoading(false);
      } catch (err) {
        setError("Error fetching reviews.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <div className="reviews-loading">Loading reviews...</div>;
  if (error) return <div className="reviews-error">{error}</div>;

  return (
    <div className="google-reviews-widget">
      <h2 className="reviews-title">What our customers say</h2>
      <div className="overall-rating">
        <div className="overall-rating-sub">
          <h3 className="google-title">
            Google <span>Reviews</span>
          </h3>
          <div className="rating-score">
            <span className="score">{overallRating}</span>
            <div className="stars">
              {"★".repeat(Math.round(overallRating))}{" "}
              {"☆".repeat(5 - Math.round(overallRating))}
            </div>
            {/* <span className="review-count">({totalReviews})</span> */}
          </div>
        </div>
        <a
          href="https://g.page/r/Cf84CB0kaZ3yEBM/review"
          className="review-button"
          target="_blank"
          rel="noreferrer"
        >
          Review us on Google
        </a>
      </div>
      <Slider {...settings} className="review-slider">
        {reviews.map((review, index) => (
          <div key={index} className="review-card-wrapper">
            <div className="review-card">
              <div className="reviewer-info">
                <div className="profile-circle">
                  <span className="profile-initial">
                    {review.author_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="review-details">
                  <h4 className="author-name">{review.author_name}</h4>
                  <p className="review-time">1 month ago</p>
                </div>
              </div>
              <div className="review-rating">{"★".repeat(review.rating)}</div>
              <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick} />
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick} />
  );
};

export default GoogleReviews;
