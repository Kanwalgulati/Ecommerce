import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../actions/cartAction";

const CartItemsCard = ({ item }) => {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(removeItemFromCart(item.product));
  };
  return (
    <div className="cartItemCard">
      <img src={item.image} alt="abc" />
      <div>
        <Link to={`/products/${item.product}`}>{item.name} </Link>
        <span>{`Price : $${item.price}`}</span>
        <p
          onClick={() => {
            removeFromCart();
          }}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemsCard;
