//This handles the schema for the products

//Libraries -->
import {Schema, model, Types} from "mongoose";
import { IProduct, IProductModel } from "../utils/interfaces";

//Commencing the app

//This is the schema for the price of ingredient database
const productSchema = new Schema<IProduct, IProductModel>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: [{
      type: String,
      required: true,
      trim: true,
    }],
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true
  },
  },
  { timestamps: true }
);

//Static create product method
productSchema.statics.createProduct = async function (
  product: IProduct
) {

  //Creating the database
  const product_ = await this.create(product);

  return product_;
};

//Static update product method
productSchema.statics.updateProduct = async function (
  id: string,
  body: IProduct
) {

  //This updates the value in the database
  const update = await this.findOneAndUpdate(
    { _id: id },
    { ...body }
  );
  return update;
};

//Static update product method
// productSchema.statics.updateProductImage = async function (
//   id: string,
//   body: { imageIndex: number, imageLink: string }
// ) {

//   const products = await this.find({}).sort({ createdAt: -1 });
//   const { images } = products
//   //This updates the value in the database
//   const update = await this.findOneAndUpdate(
//     { _id: id },
//     { ...body }
//   );
//   return update;
// };

//Static delete method
productSchema.statics.deleteProduct = async function (id: string) {
  //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

  //This deletes the ingredient from the database
  const delete_ = await this.findOneAndDelete({ _id: id });
  return delete_;
};

//Static get ingredient by the category method
productSchema.statics.getProductByCategory = async function (category: string) {
  const products = await this.find({ category: category }).sort({
    createdAt: -1,
  });
  return products;
};

/**
 * @notice Static get product by id
 * @returns The product with the given id
 */
 productSchema.statics.getProductById = async function (id: string) {
  //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }
  const product = await this.find({ _id: id })
  return product;
}

/**
 * @notice Static get all product
 * @returns All the available products
 */
 productSchema.statics.getProductByLatest = async function () {
  const products = await this.find({}).sort({ createdAt: -1 });
  return products;
};

/**
 * @notice Static get products by price method
 * @param order The order by which it should be fetched (1 and -1 for ascending and descending order respectively)
 * @returns The products defined by the order of the price
 */
 productSchema.statics.getProductByPrice = async function (_order: any) {
  const products = await this.find({}).sort({ price: _order, createdAt: -1 });
  return products;
};

/**
 * @notice Static get products by search method
 * @param keyword Keyword to be searched
 * @returns The products with the found keyword
 */
 productSchema.statics.getProductBySearch = async function (query: string) {
  const regex = RegExp(query, "i")
  const products = this.find({
    $or: [
      { category: regex },
      { name: regex },
      { description: regex }
    ]
  })
  return products
}

export const Product = model<IProduct, IProductModel>("Product", productSchema);
