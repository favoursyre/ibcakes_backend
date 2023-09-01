///This would contain all interfaces that will be used

///Libraries -->
import { Model, HydratedDocument } from 'mongoose';

///Commencing the code
///Declaring the various interfaces
export interface IView {
    msg: String
}

///Declaring the interface for inquiry
export interface IInquiry {
    _id?: string,
    fullName: string,
    emailAddress: string, 
    phoneNumber: string,
    message: string
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

///Declaring the interface for inquiry mongoose schema static
export interface IInquiryModel extends Model<IInquiry> {
    sendInquiry(inquiry: IInquiry): IInquiry,
    getAllInquiry(): Array<IInquiry>
}

///Declaring the interface for product
export interface IProduct {
    _id?: string,
    category?: string,
    name?: string,
    images?: Array<string>,
    description?: string,
    price?: number,
    quantity?: number,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

///Declaring the interface for product mongoose schema static
export interface IProductModel extends Model<IProduct> {
    createProduct(product: IProduct): IProduct,
    updateProduct(id: string, body: IProduct): IProduct,
    //updateProductImage(id: string, body: { imageIndex: number, imageLink: string }): IProduct,
    deleteProduct(id: string): IProduct,
    getProductByCategory(category: string): Array<IProduct>,
    getProductById(id: string): IProduct,
    getProductByLatest(): Array<IProduct>,
    getProductByPrice(_order: any): Array<IProduct>,
    getProductBySearch(query: string): Array<IProduct>
}

/**
 * @notice The interface for testimonials mongoose schema
 * @param name Name of the testifier
 * @param image Image of the testifier
 * @param testimony Testimony of the testifier
 */
 export interface ITestimony {
    _id?: string,
    name?: String,
    image?: String,
    testimony?: String
    createdAt?: string,
    updatedAt?: string,
    __v?: number
  }

/**
 * @notice The interface for testimonials mongoose schema static
 */
 export interface ITestimonyModel extends Model<ITestimony> {
    createTestimony(body: ITestimony): ITestimony,
    getAllTestimony(): Array<ITestimony>,
    updateTestimony(id: string, req: ITestimony): ITestimony,
    deleteTestimony(id: string): ITestimony
  }

  ///Declaring the interface for customer specification
export interface ICustomerSpec {
    readonly fullName: string,
    readonly emailAddress: string,
    readonly phoneNumber: string,
    readonly deliveryAddress: string
} 

///Declaring the interface for custom product spec
export interface ICustomSpec {
    budget: number,
    images?: Array<IFileAttachment>,
    description: string
}

///Declaring the interface for file attachment
export interface IFileAttachment {
  name: string,
  content: string,
}

///Declaring the interface for custom order model
export interface ICustomOrder {
    _id?: string,
    customerSpec: ICustomerSpec,
    productSpec: ICustomSpec,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

///Declaring the interface for cart term
export interface ICartItem {
    readonly _id: string,
    readonly image: string,
    readonly name: string,
    readonly unitPrice: number,
    quantity: number,
    minQuantity: number,
    subTotalPrice?: number
} 

///Declaring the interface for the cart
export interface ICartSpec {
  totalPrice: number,
  cart: Array<ICartItem>
}

///Declaring the interface for cart order model
export interface ICartOrder {
    _id?: string,
    customerSpec: ICustomerSpec,
    productSpec: ICartSpec,
    paymentSpec: IPayment,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

/**
 * @notice The interface for custom order mongoose schema static
 */
 export interface ICustomOrderModel extends Model<ICustomOrder> {
    processOrder(order: ICustomOrder): ICustomOrder,
    getAllOrders(): Array<ICustomOrder>,
    getOrderById(id: string): ICustomOrder
  }

  /**
 * @notice The interface for cart order mongoose schema static
 */
 export interface ICartOrderModel extends Model<ICartOrder> {
    processOrder(order: ICartOrder): ICartOrder,
    getAllOrders(): Array<ICartOrder>,
    getOrderById(id: string): ICartOrder
  }

  /**
 * @notice The interface for contact mongoose schema
 * @param phoneNumber The phone number of the company
 * @param emailAddress The email address of the company
 */
 export interface IContact {
    emailAddress?: string
    phoneNumber?: string,
    officeAddress?: string,
    emailLink?: string,
    instagramLink?: string,
    facebookLink?: string,
    whatsappLink?: string
  }
  
  /**
  * @notice The interface for contact mongoose schema static
  */
  export interface IContactModel extends Model<IContact> {
    createContact(contact: IContact): IContact,
    getAllContact(): Array<IContact>,
    updateContact(id: String, req: IContact): IContact,
    deleteContact(id: String): IContact
  }  

  ///Declaring the interface for card payment details
export interface IPayment {
  url?: string,
  reference?: string,
  status?: string,
  accessCode?: string
}

/**
 * @notice The interface for Admin mongoose schema
 * @param emailAddress The email address of the admin
 * @param password The password of the admin
 */
export interface IAdmin {
  emailAddress: String,
  password: string
}

/**
 * @notice The interface for Admin mongoose schema static
 */
export interface IAdminModel extends Model<IAdmin> {
  createAdmin(): Array<Object>,
  login(emailAddress: String, password: String): Object,
  updateAdmin(emailAddress: String, password: String): Object,
  deleteAdmin(id: String): Object
}

/**
 * @notice The interface for JWTPayload
 * @param _id The id of JWT
 */
export interface IJwtPayload {
  _id: String
}