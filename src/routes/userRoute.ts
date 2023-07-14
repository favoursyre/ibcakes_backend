//This handles the various user pages for the website

//Libraries -->
import { IRouter, Router } from "express";
import {
    createTestimony,
    updateTestimony,
    createCartOrder,
    createCustomOrder
} from "../controllers/userControler";

//Commencing the app
const router: IRouter = Router();

///Create testimony route
router.post("/user/dashboard/testimonial/add/", createTestimony)

///Update testimony route
router.patch("/user/dashboard/testimonial/:id", updateTestimony)

//Cart route
router.post("/user/dashboard/order/cart", createCartOrder);

//Order route
router.post("/user/dashboard/order/custom", createCustomOrder);

export default router;