import express from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/orders-controller.js";
import { protect } from "../middlewares/auth.js";
const orderRouter = express.Router();

orderRouter.get("/", protect, getOrders);
orderRouter.get("/:id", protect, getOrderById);
orderRouter.post("/", protect, createOrder);

export default orderRouter;
