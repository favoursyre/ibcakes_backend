//This handles the file for admin routes

//Libraries -->
import { IRouter, Router } from "express";
import {
  createProduct,
  updateProduct,
  //updateProductImage,
  deleteProduct,
  getAllInquiry,
  getCartOrderById,
  getCustomOrderById,
  getAllCartOrder,
  getAllCustomOrder,
  createContact,
  updateContact,
  deleteContact,
  deleteTestimony
} from "../controllers/adminController";
//const requireAuth = require("../middleware/requireAuth");

//Commencing the code
const router: IRouter = Router();

//This requires auth for all routes below
//router.use(requireAuth);

//Adminpage
//router.get("/admin/", adminPage);

//Get product page
//router.get("/admin/dashboard/product/", getProduct);

//Get product by category
//router.get("/admin/dashboard/product/:category", getProductByCategory);

//Create product page
router.post("/admin/dashboard/product/", createProduct);

//Update product page
router.patch("/admin/dashboard/product/:id", updateProduct);

//Update product images
//router.patch("/admin/dashboard/product/image/:id", updateProductImage)

//Delete product page
router.delete("/admin/dashboard/product/:id", deleteProduct);

//Get inquiries page
router.get("/admin/dashboard/inquiry", getAllInquiry);

///Create contact route
router.post("/admin/dashboard/contact/add/", createContact)

///Update contact route
router.patch("/admin/dashboard/contact/update/:id", updateContact)

///Delete contact route
router.delete("/admin/dashboard/contact/delete/:id", deleteContact);

///Get all orders by route
router.get("/admin/dashboard/orders/custom", getAllCustomOrder)

///Get order by id route
router.get("/admin/dashboard/orders/custom/:id", getCustomOrderById)

///Get order by id route
router.get("/admin/dashboard/orders/cart/:id", getCartOrderById)

//Get all orders by route
router.get("/admin/dashboard/orders/cart", getAllCartOrder)

///Delete testimonial route
router.delete("/admin/dashboard/testimony/:id", deleteTestimony)

export default router;
