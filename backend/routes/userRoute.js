const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);


router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser,getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/me/update").put(isAuthenticatedUser,updateProfile)

router.route("/Admin/users").get(isAuthenticatedUser,authorizeRoles("Admin"), getAllUsers)

router.route("/Admin/user/:id").get(isAuthenticatedUser, authorizeRoles("Admin"), getSingleUser).put(isAuthenticatedUser,authorizeRoles("Admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteUser)

module.exports = router;