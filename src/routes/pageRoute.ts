//This file handles the routes for the website

//Libraries -->
import { IRouter, Router } from "express";
import {
  homePage,
  getContact,
  getProductInfo,
  productSort,
  searchProduct,
  getAllProduct,
  createInquiry
} from "../controllers/pageController";

//Commencing the code
const router: IRouter = Router();

//Homepage
router.get("/", homePage);

//Admin Login page
//router.post("/admin/login", loginPage);

//About page
//router.get("/about", aboutPage);

///Get all contact route
router.get("/contacts", getContact)

//Gallery Page
//router.get("/gallery", galleryPage);

//Search route
router.get("/products/search", searchProduct)

///Get all products route
router.get("/products/", getAllProduct)

///Product info route
router.get("/product/info/:id", getProductInfo)

///Sort product route
router.get("/products/sort/:sort", productSort)

///Send inquiry route
router.post("/inquiry/add/", createInquiry)

export default router;
