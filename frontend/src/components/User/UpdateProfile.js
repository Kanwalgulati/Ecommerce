import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { CgMailOpen } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { ClearErrors, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { laodUser } from "../../actions/userAction";
import { UPDATE_PROFILE_REST } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";
import ProfilePng from "../../images/Profile.png";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const alert = useAlert();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(ProfilePng);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDateChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url);
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(laodUser());
      history.push("/account");
      dispatch({ type: UPDATE_PROFILE_REST });
    }
    if (error) {
      alert.error(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, alert, error, isUpdated, user, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h2 className="UpdateProfileHeading">Update Profile</h2>
              <form
                className="UpdateProfileForm"
                encType="multiport/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="UpdateProfileName">
                  <BiUserCircle />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="UpdateProfileEmail">
                  <CgMailOpen />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDateChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Profile"
                  className="UpdateProfileBtn"
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

export default UpdateProfile;
