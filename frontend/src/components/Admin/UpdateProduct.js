import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { AccountTree } from "@material-ui/icons";
import { Description } from "@material-ui/icons";
import { Storage } from "@material-ui/icons";
import { Spellcheck } from "@material-ui/icons";
import { AttachMoney } from "@material-ui/icons";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/ProductConstants";
import { useHistory, useParams } from "react-router-dom";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const UpdateProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const { error, product } = useSelector((state) => state.productDetails);
  const { id: productId } = useParams();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState();
  const [oldImages, setOldImages] = useState();
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setProductName(product.name);
      setProductDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearAllErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearAllErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    updateError,
    productId,
    product,
  ]);

  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const updateFormSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", productName);
    myForm.set("price", price);
    myForm.set("description", productDescription);
    myForm.set("category", category);
    myForm.set("Stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(productId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            encType="multipart/form-data"
            className="createProductForm"
            onSubmit={updateFormSubmitHandler}
          >
            <h1>Update Product</h1>
            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Description />
              <textarea
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <AccountTree />
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              >
                <option value="ok">Choose Category</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={updateProductImageChange}
              />
            </div>

            <div id="createProductFormImage">
              {oldImages?.map(({url}, index) => (
                <img key={url} src={url} alt="Old Product Preview" />
              ))}
            </div>
            
            <div id="createProductFormImage">
              {imagesPreview?.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button id="createProductBtn" type="submit" disabled={loading}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
