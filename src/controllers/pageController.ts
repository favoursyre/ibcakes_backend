//This handles the various functions for the page links

//Libraries -->
import { Request, Response } from "express"
import { Contact } from "../models/contactModel";
import { IView } from "../utils/interfaces";
import { Product } from "../models/productModel";
import "dotenv/config";
import { Inquiry } from "../models/inquiryModel";

//Commencing the code
const SECRET = process.env.SECRET;

//This handles the function of JWT
// const createToken = (_id) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };


//Contact page
export const getContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.getAllContact()
    res.status(200).json(contact);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

//Product Info page
export const getProductInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

//Product Sort
export const productSort = async (req: Request, res: Response): Promise<void> => {
  try {
    let products: Array<Object>
    const { sort: sort_ } = req.params
    const sort = Number(sort_)

    ///Checking to see what sort values were passed in
    switch (sort) {
      case 1:
        products = await Product.getProductByLatest()
        break
      case 2:
        products = await Product.getProductByPrice("desc")
        break
      case 3:
        products = await Product.getProductByPrice("asc")
        break
      default:
        throw Error("A wrong sort argument was passed in, Note: 0 = Newest arrivals, 1 = Price: High to Low, 2 = Price: Low to High")
    }

    res.status(200).json(products);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

//Search product
export const searchProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.query as string
    //console.log("Query search: ", query)
      const products = await Product.getProductBySearch(query)
      res.status(200).json(products);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

//Checkout Page
export const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.getProductByLatest()
      res.status(200).json(products);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

//Send Page
export const homePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const view: IView = { msg: "Home Page" };
    res.status(200).json(view);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

//Make inquiry Page
export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Inquiry: ', req.body)
    const inquiry = await Inquiry.sendInquiry(req.body)
      res.status(200).json(inquiry);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

