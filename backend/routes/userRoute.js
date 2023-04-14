const express = require("express");
const { userRegistration, userLogin, userLogout, forgotPassword, resetPassword, getUserDetail, isAuthenticatedUser, updateUserPassword, updateUserProfile, allUserDetail, isAdmin, 
  UserDetailbyAdmin, updateUserProfilebyAdmin, deleteUserbyAdmin,getUserDetailByAdmin } = require("../database/usersDB");
const router = express.Router();

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser ,getUserDetail);
router.route("/password/update").put(isAuthenticatedUser ,updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser ,updateUserProfile);
router.route("/admin/allUsers").get(isAuthenticatedUser,isAdmin("admin"),allUserDetail);
router.route("/admin/user/:id").get(isAuthenticatedUser,isAdmin("admin"),UserDetailbyAdmin);
router.route("/admin/user/:id").put(isAuthenticatedUser,isAdmin("admin"),updateUserProfilebyAdmin);
router.route("/admin/user/:id").delete(isAuthenticatedUser,isAdmin("admin"),deleteUserbyAdmin);
router.route("/user/:id").get(isAuthenticatedUser,getUserDetailByAdmin);
module.exports = router