"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const app = (0, express_1.default)();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;
if (!endpointSecret) {
    throw new Error("Stripe Webhook Secret is not defined");
}
app.post("/api/webhook", express_1.default.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let body = request.body.toString();
    let parsedBody = JSON.parse(body);
    const receipt = parsedBody.data.object.receipt_url;
    console.log(receipt, "THIS IS MY RECIEPT>>>>>");
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            break;
        case 'checkout.session.completed':
            const session = event.data.object;
            const updatePaymentStatus = (userId, paymentStatus) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield axios_1.default.post('http://localhost:3000/api/v1/orders/update-payment-status', {
                        userId,
                        paymentStatus: session,
                        if(receipt) {
                            receipt;
                        }
                    });
                    console.log(userId, paymentStatus);
                }
                catch (error) {
                    console.error('Failed to update payment status:', error);
                }
            });
            updatePaymentStatus(session.metadata.userId, 'succeeded');
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
});
app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
