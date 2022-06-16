import { Rating } from "@material-ui/lab";
import React from "react";
import ProfilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  console.log("file: ReviewCard.js ~ line 9 ~ ReviewCard ~ review", review);
  const options = {
    readOnly: true,
    value: review?.rating,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={ProfilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
