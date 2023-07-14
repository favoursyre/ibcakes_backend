///This handles the various functions for the admin page links

///Libraries -->
//import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import {Product} from "../models/productModel";
import { Testimony } from "../models/testimonyModel";
import { Contact } from "../models/contactModel";
import { CartOrder } from "../models/cartOrderModel";
import { CustomOrder } from "../models/customOrderModel";
import { Inquiry } from "../models/inquiryModel";
import { IView } from "../utils/interfaces";
import "dotenv/config";

///Commencing the app
const SECRET: string = process.env.SECRET!;

/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };

/**
 * @notice Create product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.createProduct(req.body)
      res.status(200).json(product);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

/**
 * @notice Update product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const product = await Product.updateProduct(id, req.body)
        res.status(200).json(product);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Update product image page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
//  export const updateProductImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//       const { id } = req.params
//       const product = await Product.updateProductImage(id, req.body)
//       res.status(200).json(product);
//     } catch (error) {
//       const error_: IView = {msg: `${error}`}
//       res.status(400).json(error_);
//     }
// }

/**
 * @notice Delete product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const product = await Product.deleteProduct(id);
        res.status(200).json(product);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Create contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
      const faq = await Contact.createContact(req.body)
      console.log("Body: ", faq)
      res.status(200).json(faq);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Update contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params
      const faq = await Contact.updateContact(id, req.body)
      res.status(200).json(faq);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
* @notice Delete contact page route
* @param req The params that were passed in during the client request
* @param res The response of the query by client request
*/
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await Contact.deleteContact(id)
      res.status(200).json(faq);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get cart order by id page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getCartOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
      const order = await CartOrder.getOrderById(id)
      res.status(200).json(order);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get custom order by id page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const getCustomOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
      const order = await CustomOrder.getOrderById(id)
      res.status(200).json(order);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get all cart orders page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getAllCartOrder = async (req: Request, res: Response): Promise<void> => {
  try {
      const orders = await CartOrder.getAllOrders()
      res.status(200).json(orders);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get all custom orders page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const getAllCustomOrder = async (req: Request, res: Response): Promise<void> => {
  try {
      const orders = await CustomOrder.getAllOrders()
      res.status(200).json(orders);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Delete testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const deleteTestimony = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const testimony = await Testimony.deleteTestimony(id)
      res.status(200).json(testimony);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
  }

  /**
 * @notice Get all inquiries page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const getAllInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
      const inquiry = await Inquiry.getAllInquiry()
      res.status(200).json(inquiry);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}



