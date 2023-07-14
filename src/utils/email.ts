///This contains the various emails to be sent

///Libraries -->
import "dotenv/config";
import { ICartOrder } from "./interfaces";

///Commencing the code 
/**
 * @notice This returns the email template for inquiry 
 * @param inquiryId The id of the inquiry
 * @param userName The name of the recipient of the email
 * @returns The email template
 */
export const inquiryEmail = (inquiryId: string, userName: string): string => {
    return `
    
    `
}

/**
 * @notice This returns the email template for custom order 
 * @param customId The id of the custom order
 * @param userName The name of the recipient of the email
 * @returns The email template
 */
 export const customOrderEmail = (customId: string, userName: string): string => {
    return `
    
    `
}

/**
 * @notice This returns the email template for cart order 
 * @param cartId The id of the custom order
 * @param userName The name of the recipient of the email
 * @param cartOrder The cart order specifications
 * @returns The email template
 */
 export const cartOrderEmail = (cartId: string, userName: string, cartOrder: ICartOrder): string => {
    return `
    
    `
}

