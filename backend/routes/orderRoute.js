const express = require("express")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController")
const router = express.Router();


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
 
router.route("/order/me").get(isAuthenticatedUser, myOrders);

router.route("/Admin/orders").get(isAuthenticatedUser, authorizeRoles("Admin"), getAllOrders)

router.route("/Admin/order/:id").put(isAuthenticatedUser, authorizeRoles("Admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteOrder)

module.exports = router;