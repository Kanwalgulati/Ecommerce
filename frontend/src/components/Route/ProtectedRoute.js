import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children, ...rest }) => {
  console.log(
    "file: ProtectedRoute.js ~ line 6 ~ ProtectedRoute ~ isAdmin",
    isAdmin
  );
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading === false && (
        <Route {...rest}>
          {isAuthenticated === false ? (
            <Redirect to="/login" />
          ) : isAdmin && user?.role === "admin" ? (
            children
          ) : !isAdmin && isAuthenticated ? (
            children
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
