///This contains the various utilities

///Libraries -->
import nodemailer from "nodemailer"
import "dotenv/config";
import { ICartOrder, ICustomOrder, IInquiry } from "./interfaces";
import paystack from 'paystack';
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import path from "path"


///Commencing the code
//export const PaystackKey = process.env.PaystackKey!
const Paystack = paystack(process.env.PaystackKey!);
const SUPPORT_EMAIL: string = process.env.SENDER_EMAIL!
const SUPPORT_PASSWORD: string = process.env.SENDER_PASSWORD!

/**
 * @notice This sends an email, works with gmail account for now
 * @param senderEmail The email address of the sender
 * @param senderPassword The password for the email address of the sender
 * @param recipientEmail The recipient's email address
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
export const sendEmail = (
  senderName: string,
  senderEmail: string, 
  senderPassword: string, 
  recipientEmail: string, 
  subject: string,
  body: string | undefined,
  template: string | undefined,
  context: Object | undefined
  ): string | void => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.privateemail.com', // Replace with your SMTP host
        port: 465, // Replace with your SMTP port
        secure: true, // Set to true if using a secure connection (e.g., port 465)
          ///service: 'gmail',
          auth: {
            user: senderEmail,
            pass: senderPassword
          }
        });


      // point to the template folder
      const handlebarOptions: NodemailerExpressHandlebarsOptions = {
        extName: '.hbs',
        viewEngine: {
            partialsDir: path.resolve('./src/utils/emails/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/utils/emails/'),
      };
        
      // use a template file with nodemailer
      transporter.use('compile', hbs(handlebarOptions))

        let mailOptions = {
          from: `${senderName} <${senderEmail}>`,
          to: recipientEmail,
          subject: subject,
          text: body,
          template: template,
          context: context
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            return error.message
          } else {
            console.log('Email sent: ' + info.response);
            return info.response
          }
        });
  }

/**
 * @notice This sends a successful inquiry email to a customer
 * @param recipientEmail The recipient's email address
 * @param recipientName The name of the recipient
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
 export const sendInquiryEmail = async (inquiry: IInquiry): Promise<string | void> => {

  const context = {
    id: inquiry._id,
    name: inquiry.fullName
  }

  const body = `
  Dear ${inquiry.fullName},
  
  Your message has been successfully sent. 
  Rest assured that our team is diligently reviewing your request, and we will get back to you shortly with the assistance you need.
  If you have any additional information inquiry, please feel free to share them with us. 

  Best regards, 
  IB Cakes & Catering Team
  `
  
  const status = await sendEmail("IB Cakes & Catering", SUPPORT_EMAIL, SUPPORT_PASSWORD, inquiry.emailAddress, "IB Cakes & Catering Inquiry", body, undefined, undefined)
  return status
}

/**
 * @notice This sends a successful custom order email to a customer
 * @param recipientEmail The recipient's email address
 * @param recipientName The name of the recipient
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
export const sendCustomOrderEmail = async (customOrder: ICustomOrder): Promise<string | void> => {

  const c = customOrder
  const context = {
    id: c._id,
    name: c.customerSpec.fullName,
    date: currentDate(0)
  }

  const body = `
  Dear ${c.customerSpec.fullName},

  Your order has been successfully sent. 
  Rest assured that our team is diligently reviewing your request and we will get back to you shortly with more details and further assistance. We understand the importance of your order and want to ensure that we meet your expectations.
  If you have any additional information or specific requirements for your order, please feel free to share them with us.
  We look forward to creating a delightful delicacy that will make your occasion truly special.

  Best regards,
  IB Cakes & Catering Team
  `
  
  const status = await sendEmail("IB Cakes & Catering", SUPPORT_EMAIL, SUPPORT_PASSWORD, c.customerSpec.emailAddress, "IB Cakes & Catering Custom Order", body, undefined, undefined)
  return status
}

/**
 * @notice This sends a successful cart order email to a customer
 * @param recipientEmail The recipient's email address
 * @param recipientName The name of the recipient
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
export const sendCartOrderEmail = async (cartOrder: ICartOrder): Promise<string | void> => {

  const c = cartOrder
  const context = {
    id: c._id,
    name: c.customerSpec.fullName,
    date: currentDate(0),
    deliveryDate: currentDate(8 * 24 * 60 * 60 * 1000),
    address: c.customerSpec.deliveryAddress,
    phoneNumber: c.customerSpec.phoneNumber,
    email: c.customerSpec.emailAddress,
    cart: c.productSpec.cart,
    subtotal: c.productSpec.totalPrice,
    deliveryFee: 100,
    total: c.productSpec.totalPrice + 100,
  }

  const body = `
  Dear ${c.customerSpec.fullName},

  Your payment for your order has been successfully processed and your order is been processed. 
  If you have any additional information or specific requirements for your order, please feel free to share them with us.

  You can view your cart order receipt at ${frontend}/order/cart/${c._id}

  Best regards,
  IB Cakes & Catering Team
  `
  
  const status = await sendEmail("IB Cakes & Catering", SUPPORT_EMAIL, SUPPORT_PASSWORD, c.customerSpec.emailAddress, "IB Cakes & Catering Cart Order", body, undefined, undefined)
  return status
}


///This is the logo image link
export const logoLink: string = "https://drive.google.com/uc?export=download&id=1ZfcsAOOA2vhkmgIVekY8vetMv__2TN9o"

///This function processes payment using paystack
export const processPayment = async (name: string, email: string, amount: number): Promise<any> => {

  const id = generateReference(email)

  console.log('Id: ', id)

  ///Initiating a transaction
  const transaction = await Paystack.transaction.initialize({ 
    name,
    email, 
    amount: amount * 100,
    reference: id,
  })

  console.log('Transaction: ', transaction)

  return transaction.data
}

///This function verifies payment using paystack
export const verifyPayment = async (id: string): Promise<any> => {
  console.log('request is been made')

  ///Verifying a transaction
  const payment = await Paystack.transaction.verify(id);

  console.log('Payment: ', payment)

  return payment.data
}

export const getEmailUsername = (email: string): string => {
 // console.log('Email: ', email)
  if (email) {
    
    const parts = email.split('@');
    //console.log("Parts: ", parts)
    if (parts.length > 1) {
      return parts[0];
    }
  }
  return email;
}

///This function generates a transaction reference id for paystack
export const generateReference = (email: string): string => {
  const emailId = getEmailUsername(email)
  return `IB-TXN-${emailId}-${Date.now()}`;
}

///This gets the current date
export const currentDate = (date: number): string => {
  const currentDate = new Date();
  const nextWeek = new Date(currentDate.getTime() + date); //8 * 24 * 60 * 60 * 1000
  const options: Intl.DateTimeFormatOptions = { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = nextWeek.toLocaleDateString('en-US', options);
  //console.log("Date: ", formattedDate)
  return formattedDate
}

///This has the frontend domain name
export const frontend = "http://localhost:3000"
