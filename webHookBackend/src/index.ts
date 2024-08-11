import express, { Request, Response } from "express"
import axios from "axios"
require('dotenv').config()


const app =express()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;

if(!endpointSecret){
    throw new Error("Stripe Webhook Secret is not defined")
}

app.post("/api/webhook",express.raw({type: 'application/json'}), (request:Request, response:Response)=>{
    const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
    
    
      break;
    // ... handle other event types

    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(session, "BETCH>>>")
      // Then define and call a function to handle the event payment_intent.succeeded
      //@ts-ignore
      const updatePaymentStatus = async (userId, paymentStatus) => {
        try {
            await axios.post('http://localhost:3000/api/v1/orders/update-payment-status', {
                userId,
                paymentStatus:session,
            });
            console.log(userId, paymentStatus);
        } catch (error) {
            console.error('Failed to update payment status:', error);
        }
    };
    updatePaymentStatus(session.metadata.userId, 'succeeded');
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
})


app.listen(5001, ()=>{
    console.log("Server is running on port 5001")
})