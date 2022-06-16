import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { RiDashboardFill } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { RiPlayListAddLine, RiShoppingCartLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import store from "../../../store";
import { Backdrop } from "@material-ui/core";
import { useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const history = useHistory();
  const alert = useAlert();
  const options = [
    { icon: <RiPlayListAddLine />, name: "Orders", func: orders },
    { icon: <IoPersonCircleOutline />, name: "Profile", func: account },
    {
      icon: (
        <RiShoppingCartLine
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <RiDashboardFill />,
      name: "Dashboard",
      func: dashBoard,
    });
  }

  function cart() {
    history.push("/Cart");
  }

  function dashBoard() {
    history.push("/admin/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function logoutUser() {
    store.dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 11 }} />
      <SpeedDial
        ariaLabel="Speeddial tooltip Example"
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        className="speedDial"
        direction="down"
        style={{ zIndex: 11 }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
