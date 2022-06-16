import React from "react";
import { CheckCircleOutline } from "@material-ui/icons";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleOutline />
      <Typography>Your Order has Been Placed Successfully</Typography>
      <Link to="orders">View orders</Link>
    </div>
  );
};

export default OrderSuccess;
