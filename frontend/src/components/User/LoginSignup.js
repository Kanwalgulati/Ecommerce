import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { MdLockOpen } from "react-icons/md";
import { CgMailOpen } from "react-icons/cg";
import { Link, useHistory, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { login, ClearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
const LoginSignup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const loginTab = useRef(null);
  let history = useHistory();
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const loginSubmit = (e) => {
    dispatch(login(loginEmail, loginPassword));
    e.preventDefault();
    console.log("Form SUbmitted");
  };

  
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, alert, error, isAuthenticated, history, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current?.classList.add("shiftToNeutral");
      switcherTab.current?.classList.remove("shiftToRight");
      registerTab.current?.classList.remove("shiftToNeutralForm");
      loginTab.current?.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current?.classList.add("shiftToRight");
      switcherTab.current?.classList.remove("shiftToNeutral");
      registerTab.current?.classList.add("shiftToNeutralForm");
      loginTab.current?.classList.add("shiftToLeft");
    }
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDateChange = (e) => {
    console.log(
      "file: LoginSignup.js ~ line 90 ~ registerDateChange ~ e",
      e.target.name
    );
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox">
              <div>
                <div className="login_signUp_toggle">
                  <p
                    onClick={(e) => {
                      switchTabs(e, "login");
                    }}
                  >
                    Login
                  </p>
                  <p
                    onClick={(e) => {
                      switchTabs(e, "register");
                    }}
                  >
                    Register
                  </p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <CgMailOpen />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                  />
                </div>
                <Link to="password/forgot">Forgot Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multiport/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <BiUserCircle />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDateChange}
                  />
                </div>
                <div className="signUpEmail">
                  <CgMailOpen />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDateChange}
                  />
                </div>
                <div className="signUpPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={registerDateChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDateChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                  //   disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignup;
