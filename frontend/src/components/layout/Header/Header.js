import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { BsSearch } from "react-icons/bs";
import { FaUserAlt, FaCartPlus } from "react-icons/fa";

const options = {
  burgerColorHover: "#92B4EC",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoTransition: 0.6,
  logoAnimationTime: 1,
  logoHoverSize: "10px",
  logoHoverColor: "#92B4EC",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#92B4EC",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#92B4EC",
  searchIconColorHover: "#92B4EC",
  cartIconColorHover: "#92B4EC",
  cartIconMargin: "1vmax",
  searchIcon: true,
  profileIcon: true,
  cartIcon: true,
  ProfileIconElement: FaUserAlt,
  SearchIconElement: BsSearch,
  CartIconElement: FaCartPlus,
  searchIconMargin: "15",
  profileIconMargin: "15",
};

function Header() {
  return <ReactNavbar {...options} />;
}

export default Header;
