const express = require("express");
const { placeOrder,getUserOrders,getOrderById} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware"); // Ensure user is authenticated

const router = express.Router();

router.post("/", protect, placeOrder); // Fix the endpoint
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;