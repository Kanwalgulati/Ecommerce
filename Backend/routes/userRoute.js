const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSpecificUserDetail,
  updateUseRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetail);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router
  .route("/admin/fetchAllUsers")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
router
  .route("/admin/userDetails/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSpecificUserDetail)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUseRole)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

router.route("/logout").get(logout);

module.exports = router;
