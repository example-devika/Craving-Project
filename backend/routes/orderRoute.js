import express from "express"
import authMiddleware from "../middleware/auth.js"
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import {placeOrder,listOrders, updateStatus, userOrder, verifyOrder}  from "../controllers/orderController.js"

const orderRouter=express.Router()
orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleware,userOrder)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);






export default orderRouter