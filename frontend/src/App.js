import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import store from "./store";
import Search from "./components/Product/Search";
import "./App.css";
import LoginSignup from "./components/User/LoginSignup";
import { laodUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/Admin/DashBoard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrdersList from "./components/Admin/OrdersList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews.js";
import AboutPage from "./components/layout/About";
import ContactUsPage from "./components/layout/ContactUs";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {
      data: { stripeApiKey: stripeKey },
    } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(stripeKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    getStripeApiKey();

    store.dispatch(laodUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exect path="/process/payment">
            <Payment />
          </ProtectedRoute>
        </Elements>
      )}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/contact">
          <ContactUsPage />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:keyword">
          <Products />
        </Route>
        <Route path="/Search">
          <Search />
        </Route>
        <ProtectedRoute path="/account">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/me/update">
          <UpdateProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/password/update">
          <UpdatePassword />
        </ProtectedRoute>
        <ProtectedRoute path="/shipping">
          <Shipping />
        </ProtectedRoute>

        <ProtectedRoute path="/order/confirm">
          <ConfirmOrder />
        </ProtectedRoute>

        <Route path="/password/forgot">
          <ForgotPassword />
        </Route>
        <Route path="/password/reset/:tokenReset">
          <ResetPassword />
        </Route>
        <Route path="/login">
          <LoginSignup />
        </Route>
        <Route path="/Cart">
          <Cart />
        </Route>
        <ProtectedRoute exect path="/success">
          <OrderSuccess />
        </ProtectedRoute>
        <ProtectedRoute exect path="/orders">
          <MyOrders />
        </ProtectedRoute>
        <ProtectedRoute exect path="/order/:id">
          <OrderDetails />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/dashboard">
          <DashBoard />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/products">
          <ProductList />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/product/:id">
          <UpdateProduct />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/order/:id">
          <ProcessOrder />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/orders">
          <OrdersList />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/product">
          <NewProduct />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/users">
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/user/:id">
          <UpdateUser />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="/admin/reviews">
          <ProductReviews />
        </ProtectedRoute>
        <ProtectedRoute isAdmin exect path="admin/reviews/:id">
          <UpdateUser />
        </ProtectedRoute>
        <Route>
          {window.location.pathname === "/process/payment" ? null : (
            <NotFound />
          )}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
