import express, { Request, Response } from "express";
import axios from "axios";
require('dotenv').config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the webhook server");
});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;

if (!endpointSecret) {
  throw new Error("Stripe Webhook Secret is not defined");
}



app.post("/api/webhook", express.raw({ type: 'application/json' }), async (request: Request, response: Response) => {
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
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Retrieve the Charge or PaymentIntent to get the receipt URL
      let receiptUrl;
      if (session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        if (paymentIntent.latest_charge) {
          const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
          receiptUrl = charge.receipt_url;
        }
      }

      console.log("Receipt URL:", receiptUrl);

      const updatePaymentStatus = async (userId: string, paymentStatus: string, receipt: string) => {
        try {
          await axios.post(`${process.env.BACKEND_URL}/api/v1/orders/update-payment-status`, {
            userId,
            paymentStatus: session,
            receipt: receiptUrl!
          });
          console.log(userId, paymentStatus, receiptUrl!);
        } catch (error) {
          console.error('Failed to update payment status:', error);
        }
      };

      await updatePaymentStatus(session.metadata.userId, 'succeeded', receiptUrl);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});