//This handles the various user pages for the website

//Libraries -->
import { IRouter, Router } from "express";
import {
    createTestimony,
    updateTestimony,
    createCartOrder,
    getCartOrder,
    createCustomOrder,
    initializePayment,
    verifyPayment
} from "../controllers/userControler";

//Commencing the app
const router: IRouter = Router();

///Create testimony route
router.post("/user/dashboard/testimonial/add/", createTestimony)

///Update testimony route
router.patch("/user/dashboard/testimonial/:id", updateTestimony)

//Cart route
router.post("/user/dashboard/order/cart", createCartOrder);

//Get Cart route
router.get("/user/dashboard/order/cart/:id", getCartOrder)

//Order route
router.post("/user/dashboard/order/custom", createCustomOrder);

//Initialize payment route
router.post("/user/dashboard/payment/initialize", initializePayment);

//Cart route
router.post("/user/dashboard/payment/verify/:id", verifyPayment);

export default router;