import React, { useState } from "react";

const ReviewAuthorImage = ({ review }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {!imageError ? (
        <img
          src={review.profile_photo_url}
          alt={review.author_name}
          crossOrigin="anonymous"
          className="review-author-img"
          onError={handleImageError}
        />
      ) : (
        <div className="profile-circle">
          <span className="profile-initial">
            {review.author_name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
};

export default ReviewAuthorImage;
