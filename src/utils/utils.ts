///This contains the various utilities

///Libraries -->
import nodemailer from "nodemailer"
import "dotenv/config";
import { IDebitCard } from "./interfaces";
const Paystack = require('paystack');


///Commencing the code
export const PaystackKey = process.env.PaystackKey
const paystack = new Paystack(PaystackKey);

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
    senderEmail: string, 
    senderPassword: string, 
    recipientEmail: string, 
    subject: string,
    body: string
    ) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: senderEmail,
              pass: senderPassword
            }
          });
          
          let mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject: subject,
            text: body
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

///This is the logo image link
export const logoLink: string = "https://drive.google.com/uc?export=download&id=1ZfcsAOOA2vhkmgIVekY8vetMv__2TN9o"

///This function processes payment using paystack
export const processPayment = async (debitCard: IDebitCard, customerEmail: string, amount: number) => {

  ///Initiating a transaction
  const transaction = await paystack.transaction.initialize({
    email: customerEmail,
    amount: amount * 100, // Convert amount to kobo (smallest currency unit)
    card: {
      number: debitCard.cardNumber,
      cvv,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
    },
  })
}
