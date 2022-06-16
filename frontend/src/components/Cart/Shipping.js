import React, { Fragment, useState } from "react";

import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import { HiHome } from "react-icons/hi";
import {
  MdPublic,
  MdTransferWithinAStation,
  MdLocationCity,
  MdPinDrop,
} from "react-icons/md";
import { BiPhoneIncoming } from "react-icons/bi";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNumber })
    );
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            onSubmit={shippingSubmit}
            encType="multipart/form-data"
          >
            <div>
              <HiHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <MdLocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <MdPinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <BiPhoneIncoming />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <MdPublic />
              <select
                required
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <MdTransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
