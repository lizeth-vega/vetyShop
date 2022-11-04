const express = require("express");
const { newOrder, getOneOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticateUser, authorizeRoles } = require("../middlerware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticateUser, newOrder)
router.route("/order/:id").get(isAuthenticateUser, getOneOrder)
router.route("/orders/me").get(isAuthenticateUser, myOrders)

//rutas de admin
router.route("/admon/orders").get(isAuthenticateUser,authorizeRoles("admin"), allOrders)
router.route("/admon/order/:id").put(isAuthenticateUser,authorizeRoles("admin"), updateOrder)
router.route("/admon/order/:id").delete(isAuthenticateUser, authorizeRoles ("admin"), deleteOrder)


module.exports=router;