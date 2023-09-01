///This handles the various functions for the user page links

///Libraries -->
//import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { Testimony } from "../models/testimonyModel";
import { CartOrder } from "../models/cartOrderModel";
import { CustomOrder } from "../models/customOrderModel";
import { processPayment, verifyPayment as vp, sendCartOrderEmail, sendCustomOrderEmail } from "../utils/utils";
import { IView } from "../utils/interfaces";
import paystack from "paystack"
import "dotenv/config";

///Commencing the app
const SECRET: string = process.env.SECRET!;
const Paystack = paystack(process.env.PaystackKey!)

/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };

/**
 * @notice Create testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createTestimony = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimony = await Testimony.createTestimony(req.body)
      res.status(200).json(testimony);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

/**
 * @notice Update testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const updateTestimony = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const testimony = await Testimony.updateTestimony(id, req.body)
    res.status(200).json(testimony);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

/**
 * @notice Create cart order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createCartOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await CartOrder.processOrder(req.body)
        console.log('Cart Order: ', order)

        //Send email to client
        const email = await sendCartOrderEmail(order)
        console.log("Email: ", email)

        res.status(200).json(order);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Get cart order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getCartOrder = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params
      const order = await CartOrder.getOrderById(id)
      console.log('Cart Order: ', order)

      res.status(200).json(order);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Create custom order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createCustomOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await CustomOrder.processOrder(req.body)
        console.log('Custom Order: ', order)

        //Send email to client
        const email = await sendCustomOrderEmail(order)
        console.log("Email: ", email)

        res.status(200).json(order);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Initialize payment page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const initializePayment = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log('Custom Order: ', await req.body)
      const { name, email, amount } = req.body
      ///Make payment for the cart
      const url = await processPayment(name, email, amount)
      res.status(200).json(url);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Create verify payment page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
      //console.log('Custom Order: ', await req.body)
      const { id } = req.params
      const status = await vp(id)
      res.status(200).json(status);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}
