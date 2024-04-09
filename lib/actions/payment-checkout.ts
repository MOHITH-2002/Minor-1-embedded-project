"use server"
import Stripe from "stripe"
import { redirect } from "next/navigation"
import { connectToDb } from "../database/db";
import Order from "../database/model/order-schema";


interface CreateUserParams {
    passengers:number;
    bookingTime:Date;
    price:number;
    destination:string;
    source:string;
    email:string | undefined;
    username:string | undefined;


}
interface CheckoutOrderParams {
    
    price:number;
    userId:string;
    email:string | undefined;


}
interface createOrderParams {

  stripeId:string;
    userId:string;
    totalAmount?:string | number;
    


}


export const createUser = async (order: CreateUserParams) => {
  try {
    
    await connectToDb();
    
    
    const newuser = await Order.create({
      email:order.email,
      name:order.username,
      bookingTime:order.bookingTime,
      passengers:order.passengers,
      source:order.source,
      destination:order.destination,
      totalAmount:order.price

    })
    return JSON.parse(JSON.stringify(newuser));

  } catch (error) {
    console.log("error in creating user");
    console.log(error);
    
    
    
  }
}

export const checkoutOrder = async ({userId,price,email}:CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(price) * 100;


  try {
    const session = await stripe.checkout.sessions.create({
      customer_email:email,
      line_items: [
        {
          price_data: {
            currency: 'INR',
            unit_amount: amount,
            product_data: {
              name: "Tickets Booking"
            }
            
          },
          quantity: 1
        },
      ],
      metadata: {
      userId:userId,
    },
      
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });


    
    
    

    redirect(session.url!);
    
    
  } catch (error) {
    throw error;
  }
}
export const createOrder = async (order: createOrderParams) => {
  try {
    
    
    await connectToDb();
    const newOrder = await Order.findByIdAndUpdate(order.userId,{
      paymentVerification:new Date(),     
      stripeId:order.stripeId,
    });
    
    console.log("success from update payment verification");
    

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("error in creating order");
    
  }
}
