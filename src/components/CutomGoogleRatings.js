import React, { useState, useEffect } from "react";
import axios from "axios";

const GoogleReviews = ({ placeId, apiKey }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json`,
          {
            params: {
              place_id: placeId,
              fields: "reviews",
              key: apiKey,
            },
          }
        );
        setReviews(response.data.result.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [placeId, apiKey]);

  return (
    <div className="google-reviews-widget">
      <h2>Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <h3>{review.author_name}</h3>
          <p>Rating: {review.rating}/5</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;
