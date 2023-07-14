///This handles the various functions for the user page links

///Libraries -->
//import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { Testimony } from "../models/testimonyModel";
import { CustomOrder } from "../models/customOrderModel";
import { CartOrder } from "../models/cartOrderModel";
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
        console.log('Custom Order: ', await req.body)
        //const order = await CustomOrder.processOrder(req.body)
        res.status(200).json("ks");
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}
