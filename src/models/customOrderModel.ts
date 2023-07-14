//This handles the schema for all custom order details

//Libraries -->
import {Schema, model, Types} from "mongoose";
import { ICustomOrder, ICustomOrderModel } from "../utils/interfaces";

//Commencing the app

//This is the schema for the user database
const customOrderSchema = new Schema<ICustomOrder, ICustomOrderModel>(
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
      budget: {
        type: Number,
        required: true,
      },
      images: [{
        type: String,
        required: true,
        trim: true,
      }],
      information: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

//Static process order method
customOrderSchema.statics.processOrder = async function (
  order: ICustomOrder
) {

  //Creating the database
  const order_ = await this.create(order);

  //Send order to the admin

  return order_;
};

//Static get all cake orders method
customOrderSchema.statics.getAllOrders = async function () {
  const order = await this.find({}).sort({ createdAt: -1 });
  return order;
};

/**
 * @notice Static get order by Id method
 * @param Id of the order to be queried
 * @returns Order with the given id
 */
 customOrderSchema.statics.getOrderById = async function (id: string) {
  //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }
  const order = await this.find({ _id: id })
  return order;
}

export const CustomOrder = model<ICustomOrder, ICustomOrderModel>("CustomOrder", customOrderSchema);
