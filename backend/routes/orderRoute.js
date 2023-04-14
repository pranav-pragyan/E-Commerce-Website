const express = require("express");
const { createOrder, getOrderDetail, getOrderDetailByAdmin, getAllOrderDetailByAdmin, updateOrderStatusByAdmin, deleteOrderByAdmin,getOrderDetailByUser, processPayment,sendStripeAPIKey } = require("../database/orderDB");
const { isAuthenticatedUser, isAdmin } = require("../database/usersDB");
const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser,createOrder);
router.route("/orders/detail").get(isAuthenticatedUser,getOrderDetail);
router.route("/order/:id").get(isAuthenticatedUser,getOrderDetailByUser);
router.route("/admin/order/:id").get(isAuthenticatedUser,isAdmin("admin"),getOrderDetailByAdmin);
router.route("/admin/orders").get(isAuthenticatedUser,isAdmin("admin"),getAllOrderDetailByAdmin);
router.route("/admin/order/update/:id").put(isAuthenticatedUser,isAdmin("admin"),updateOrderStatusByAdmin);
router.route("/admin/order/delete/:id").delete(isAuthenticatedUser,isAdmin("admin"),deleteOrderByAdmin);
router.route("/payment/proccess").post(isAuthenticatedUser,processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeAPIKey);
module.exports = router;