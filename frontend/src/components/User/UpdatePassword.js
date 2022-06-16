import React, { Fragment, useEffect, useState } from "react";
import "./updatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ClearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_REST } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";
import { MdLockOpen, MdVpnKey } from "react-icons/md";
import { CgLock } from "react-icons/cg";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      history.push("/account");
      dispatch({ type: UPDATE_PASSWORD_REST });
    }
    if (error) {
      alert.error(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, alert, error, isUpdated, history]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Change Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <CgLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>

                <input
                  type="submit"
                  value="Change Password"
                  className="updatePasswordBtn"
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

export default UpdatePassword;
