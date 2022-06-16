import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  let { ratings, name, numOfReviews, price, _id: productId } = product || {};
  const options = {
    size: "small",
    readOnly: true,
    value: ratings,
    precision: 0.5,
  };

  return (
    <Link className="ProductCard" to={`/product/${productId}`} id={productId}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{name}</p>
      <div>
        <Rating {...options} />
        <span>{`(${numOfReviews} Reviews)`}</span>
      </div>
      <span>{`₹ ${price}`}</span>
    </Link>
  );
};

export default ProductCard;
