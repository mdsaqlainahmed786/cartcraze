import express, { Request, Response } from "express"
import axios from "axios"
require('dotenv').config()



const app = express()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;

if (!endpointSecret) {
  throw new Error("Stripe Webhook Secret is not defined")
}

app.post("/api/webhook", express.raw({ type: 'application/json' }), (request: Request, response: Response) => {
  const sig = request.headers['stripe-signature'];
  let body = request.body.toString()
  let parsedBody = JSON.parse(body)
  const receipt = parsedBody.data.object.receipt_url
  console.log(receipt, "THIS IS MY RECIEPT>>>>>")

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
    case 'checkout.session.completed':
      const session = event.data.object;
      const updatePaymentStatus = async (userId: string, paymentStatus: string) => {
        try {
          await axios.post('http://localhost:3000/api/v1/orders/update-payment-status', {
            userId,
            paymentStatus: session,
            if(receipt:string){
              receipt
            }
          });
          console.log(userId, paymentStatus);
        } catch (error) {
          console.error('Failed to update payment status:', error);
        }
      };
      updatePaymentStatus(session.metadata.userId, 'succeeded');
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.send();
})


app.listen(5001, () => {
  console.log("Server is running on port 5001")
})