import React from "react";
import playstore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import './Footer.css'

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>Hight Quality is our First Priority</p>
        <p>Copyrights 2022 &copy; Kanwal Gulati</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/kanwalgulati">Instagram</a>
        <a href="http://instagram.com/kanwalgulati">Youtube</a>
        <a href="http://instagram.com/kanwalgulati">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
