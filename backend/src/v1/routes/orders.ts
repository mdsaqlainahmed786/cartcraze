import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { paymentMiddleware } from "./middlewares/paymentMiddleware";
import nodemailer from 'nodemailer';
import fs from "fs";
import dotenv from 'dotenv';
import path from "path";
import authMiddleware from "./middlewares/authMiddleware";
export const orderRouter = express.Router()
const prisma = new PrismaClient()
orderRouter.use(express.json())
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // Your App password
    }
});
orderRouter.post('/update-payment-status', async (req, res) => {
    const { userId, paymentStatus, receipt } = req.body;

    console.log(req.body, "THIS IS REQUEST BODY");

    if (!userId || !paymentStatus) {
        return res.status(400).json({ error: 'Missing userId or paymentStatus' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { paymentSession: true },
        });
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        console.log("Payment receipt:", receipt);

        // Uncomment and use this code when you're ready to send emails
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: {
                name: 'CartCraze',
                address: process.env.EMAIL_USER
            },
            to: user?.email,
            subject: 'Payment Receipt',
            text: `Click on the link to view your order receipt. Thank you for shopping with us!`,
            html: `<p>Thank you for shopping with us, click on the link to view your order receipt: <a href="${receipt}">Get receipt</a></p>`,
        };
         //@ts-ignore
        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }

        await sendMail(transporter, mailOptions);
        

        res.status(200).json({ message: 'Payment status updated successfully and the mail has been sent!', user: updatedUser });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

orderRouter.use(authMiddleware)
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string,
        email: string
    }
}
orderRouter.get("/getorders", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ message: "unauthorized!" })
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userId
            },
            include: {
                product: true
            }
        })
        const totalAmount = orders.reduce((total, item) => {
            return total + item.product.newPrice * item.quantity;
        }, 0)
        res.status(200).json({orders, totalAmount})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})
orderRouter.post("/add", paymentMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "unauthorized!" });

    try {
        const cartItems = await prisma.cart.findMany({
            where: { userId },
            include: { product: true },
        });

        if (!cartItems.length) {
            return res.status(400).json({ message: "No items in the cart" });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
    //   //  console.log(user?.paymentSession);  false
    //     if (!user?.paymentSession) {
    //         return res.status(400).json({ message: "Please pay to proceed" });
    //     }
        const orders = await prisma.$transaction(
            cartItems?.map((item) =>
                prisma.order.create({
                    data: {
                        userId,
                        productId: item.productId,
                        size: item.size,
                        quantity: item.quantity,
                    },
                })
            )
        );

        // Reset the payment session to false after placing the order
        await prisma.user.update({
            where: { id: userId },
            data: { paymentSession: false },
        });

        await prisma.cart.deleteMany({
            where: { userId },
        });

        res.status(200).json({ message: "Order placed successfully!", orders });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

