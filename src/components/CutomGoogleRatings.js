import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import ReviewAuthorImage from "./ReviewAuthorImgComp";

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/google-reviews`
        );

        if (
          response.data &&
          response.data.reviews &&
          response.data.totalReviews !== undefined &&
          response.data.overallRating !== undefined
        ) {
          setReviews(response.data.reviews);
          setTotalReviews(response.data.totalReviews);
          setOverallRating(response.data.overallRating);
        } else {
          setError("Invalid data format received.");
        }
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

  if (loading)
    return (
      <div className="reviews-loading">
        <span className="reviews-loader"></span>
      </div>
    );
  if (error)
    return (
      <div className="reviews-error">
        <a
          href="https://g.page/r/Cf84CB0kaZ3yEBM/review"
          className="review-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Review us on Google"
        >
          Review Us on Google
        </a>
      </div>
    );

  return (
    <section className="google-reviews-widget" aria-label="Customer Reviews">
      <h2 className="reviews-title">What Our Customers Say</h2>

      <div className="overall-rating">
        <div className="overall-rating-sub">
          <h3 className="google-title">
            Google <span>Reviews</span>
          </h3>
          <div className="rating-score">
            <span
              className="score"
              aria-label={`Overall rating: ${overallRating}`}
            >
              {overallRating}
            </span>
            <div className="stars" aria-hidden="true">
              {"★".repeat(Math.round(overallRating))}{" "}
              {"☆".repeat(5 - Math.round(overallRating))}
            </div>
            <span
              className="review-count"
              aria-label={`Total reviews: ${totalReviews}`}
            >
              ({totalReviews})
            </span>
          </div>
        </div>
        <a
          href="https://g.page/r/Cf84CB0kaZ3yEBM/review"
          className="review-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Review us on Google"
        >
          Review Us on Google
        </a>
      </div>

      <Slider {...settings} className="review-slider">
        {reviews.map((review, index) => (
          <div key={index} className="review-card-wrapper">
            <article
              className="review-card"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="reviewer-info">
                <ReviewAuthorImage review={review} />
                <div className="review-details">
                  <h4 className="author-name" itemProp="author">
                    {review.author_name}
                  </h4>
                  <time
                    className="review-time"
                    dateTime={new Date(review.time).toISOString()}
                  >
                    {review.relative_time_description}
                  </time>
                </div>
              </div>
              <div
                className="review-rating"
                aria-label={`Rating: ${review.rating}`}
              >
                {"★".repeat(review.rating)}
              </div>
              <p className="review-text" itemProp="reviewBody">
                {review.text}
              </p>
            </article>
          </div>
        ))}
      </Slider>
    </section>
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
