import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
export const orderRouter = express.Router()
const prisma = new PrismaClient()
orderRouter.use(express.json())
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

orderRouter.post("/add", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ message: "unauthorized!" })
    try {
      
        const cartItems = await prisma.cart.findMany({
            where: { userId },
            include: { product: true },
        });

        if (!cartItems.length) {
            return res.status(400).json({ message: "No items in the cart" });
        }

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
        // await prisma.recentOrder.upsert({
        //     where: { id:userId },
        //     update: { orders: orders },
        //     create: {
        //         userId,
        //         orders: orders,
        //     },
        // });
        await prisma.cart.deleteMany({
            where: { userId },
        });
        res.status(200).json({ message: "Order placed successfully!", orders});
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
