//This handles the schema for the cart order details

//Libraries -->
import {Schema, model, Types} from "mongoose";
import { ICartOrder, ICartOrderModel, ICartItem } from "../utils/interfaces";

//Commencing the app

//This is the schema for the user database
const cartOrderSchema = new Schema<ICartOrder, ICartOrderModel>(
  {
    customerSpec: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      emailAddress: {
        type: String,
        required: true,
        trim: true
      },
      phoneNumber: {
        type: String,
        required: true,
        trim: true
      },
      deliveryAddress: {
        type: String,
        required: true,
        trim: true
      },
    },
    productSpec: {
      totalPrice: {
        type: Number,
        required: true,
      },
      cart: {
        type: Array<ICartItem>,
        required: true,
      }
    },
    paymentSpec: {
      gateway: {
        type: String,
        default: "Paystack",
        required: true,
      },
      status: {
        type: String,
        default: "Pending",
        required: true,
      },
      referenceID: {
        type: String,
        default: "Null",
        required: true,
      },
    },
  },
  { timestamps: true }
);

//Static process order method
cartOrderSchema.statics.processOrder = async function (
  order: ICartOrder
) {

  //Creating the database
  const order_ = await this.create(order);

  //Process the payment here also

  return order_;
};


//Static get all cart orders method
cartOrderSchema.statics.getAllOrders = async function () {
  const order = await this.find({}).sort({ createdAt: -1 });
  return order;
};

/**
 * @notice Static get order by Id method
 * @param Id of the order to be queried
 * @returns Order with the given id
 */
 cartOrderSchema.statics.getOrderById = async function (id: string) {
  //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }
  const order = await this.find({ _id: id })
  return order;
}

export const CartOrder = model<ICartOrder, ICartOrderModel>("CartOrder", cartOrderSchema);
