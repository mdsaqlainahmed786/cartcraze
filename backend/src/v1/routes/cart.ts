import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
export const cartRouter = express.Router()
const stripe = require('stripe')("sk_test_51PdkvCAvBpizqBWZNPKsJ9odNwuml1kTx5qQ7nbuZ13DtIxvWSn4kIlA9XiotRSLZ6SksEHQezN2kkzVQqtP2Qcm00bQ4UON3F")
const prisma = new PrismaClient()
cartRouter.use(express.json())
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string,
        email: string
    }
}

//("sk_test_51PdkvCAvBpizqBWZNPKsJ9odNwuml1kTx5qQ7nbuZ13DtIxvWSn4kIlA9XiotRSLZ6SksEHQezN2kkzVQqtP2Qcm00bQ4UON3F")
// const pincodeData: Record<string, [string, string]> = JSON.parse(
//     fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'v1', 'routes', 'pincodeData.json'), 'utf8')
// );
cartRouter.get('/getcart', async (req: AuthenticatedRequest, res: Response) => {
    const authenticatedUser = req as AuthenticatedRequest
    if (!authenticatedUser) return res.status(400).json({ message: "The user is not authenticated!" })
    const userId = req.user?.userId
    try {
        const cartItems = await prisma.cart.findMany({
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


        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.product.newPrice * item.quantity;
        }, 0)
        res.status(200).json({
            cartItems,
            totalAmount
        })
    } catch (error) {
        res.json({
            error
        })
    }
})

cartRouter.post("/add", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    console.log(userId, "This is the user id")
    if (!userId) return res.status(401).json({ message: "unauthorized!" })
    try {
        const { productId, quantity, size } = req.body
        const existingProduct = await prisma.cart.findFirst({
            where: {
                productId,
                userId
            },
            include: {
                product: true
            }
        })

        if (existingProduct) {
            //  console.log(existingProduct)
            res.status(400).json({
                message: "The product already exists in the cart!",
            })
            //   console.log(updatedProduct)
        }
        else {
            const item = await prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity,
                    size,

                },
                include: {
                    product: true
                }
            })
            res.status(200).json({
                message: "The product added to cart!",
                item
            })
        }
    } catch (error) {
        res.json({
            message: "There was a error",
            error
        })
    }
})

cartRouter.put("/update/:id", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    const cartId = req.params?.id
    if (!userId) return res.status(401).json({
        message: "The user is not authenticated"
    })
    try {
        const { productId, quantity, size } = req.body
        const ifExistProductToUpdate = await prisma.cart.findFirst({
            where: {
                productId,
                userId
            },
            include: {
                product: true
            }
        })
        if (!ifExistProductToUpdate) return res.json({ message: "No cart item to update!" })
        const updatedQuantityItem = await prisma.cart.update({
            where: {
                id: cartId,
                userId
            },
            data: {
                productId,
                quantity,
                size
            }
        })
        //  console.log(updatedQuantityItem)
        res.status(200).json({
            message: "Cart quantity updated successfully!",
            updatedQuantityItem
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "There was a error",
            error
        })
    }
})

cartRouter.delete("/delete/:id", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    const cartId = req.params?.id
    try {
        const existingCart = await prisma.cart.findUnique({
            where: {
                id: cartId,
                userId
            }
        });

        if (!existingCart) {
            return res.status(404).json({ message: "The cart doesn't exist!" });
        }
        await prisma.cart.delete({
            where: {
                id: cartId,
                userId
            }
        })
        if (!cartId) return res.json({ msg: "The cart doesn't exist!!!" })
        res.status(200).json({
            message: "The cart has been deleted!"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "There was a error",
            error
        })
    }
})

cartRouter.delete("/deleteall", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    try {
        await prisma.cart.deleteMany({
            where: {
                userId
            }
        })
        res.status(200).json({
            message: "The complete cart has been deleted"
        })

    } catch (error) {
        res.json({
            message: "There was a error",
            error
        })
    }
})
cartRouter.post("/create-checkout-session", async (req: AuthenticatedRequest, res: Response) => {
    const products = req.body.products;
    try {
        const lineItems = products.map((item: any) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.product.title,
                },
                unit_amount: item.product.newPrice * 100,
            },
            quantity: item.quantity,
        }));

        const taxPercentage = 0.05;
        //@ts-ignore
        const totalAmount = lineItems.reduce((total: number, item) => {
            return total + item.price_data.unit_amount * item.quantity;
        }, 0);
        const taxAmount = totalAmount * taxPercentage;

        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Tax',
                },
                unit_amount: Math.round(taxAmount),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173',
            metadata:{
                userId: req.user?.userId
            }
            
        });
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe session error:", error);
        res.status(500).send("Error creating session");
    }
});
// cartRouter.get("/buy-now", async (req: AuthenticatedRequest, res: Response) => {
//     const userId = req.user?.userId
//     if (!userId) return res.status(401).json({ message: "unauthorized!" })
//         try{

//     }catch(error){
//         res.json({
//             message: "There was a error",
//             error
//         })
//     }
// })