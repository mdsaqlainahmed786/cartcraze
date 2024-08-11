import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { paymentMiddleware } from "./middlewares/paymentMiddleware";
import fs from "fs";
import path from "path";
import authMiddleware from "./middlewares/authMiddleware";
export const orderRouter = express.Router()
const prisma = new PrismaClient()
orderRouter.use(express.json())

orderRouter.post('/update-payment-status', async (req, res) => {
    const { userId, paymentStatus } = req.body;

    console.log(req.body, "THIS IS DSMNN REQUEST BODY")

    if (!userId || !paymentStatus) {
        return res.status(400).json({ error: 'Missing userId or paymentStatus' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { paymentSession: true },
        });

        res.status(200).json({ message: 'Payment status updated successfully', user: updatedUser });
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

