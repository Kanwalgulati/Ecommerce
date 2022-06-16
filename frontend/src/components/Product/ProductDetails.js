import React, { Fragment, useState } from "react";
import { Carousel } from "react-responsive-carousel";
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewReview,
  clearAllErrors,
  getProductDetails,
} from "../../actions/productAction";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const submitReviewToggel = () => {
    setOpen(!open);
  };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    setQuantity((quantity) => quantity + 1);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    setQuantity((quantity) => quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId, quantity));
    alert.success("Product Added To Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearAllErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearAllErrors());
    }
    if (success) {
      alert.success("Review Submited Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, error, alert, success, reviewError]);
  const options = {
    size: "large",
    readOnly: true,
    value: product?.ratings,
    precision: 0.5,
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", productId);

    dispatch(addNewReview(myForm));

    setOpen(false);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- Ecommerce`} />

          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, index) => (
                    <div key={item.url}>
                      <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${index} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-Comment">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1> {`₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.Stock < 1}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>{" "}
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="SubmitReview" onClick={submitReviewToggel}>
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggel}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                cols="30"
                rows="5"
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggel}>
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review.name} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
